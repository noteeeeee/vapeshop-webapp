import type {CartCreateDto, CartDto, ProductDto} from "~/types";
import {useAsyncState, watchArray, watchDeep, watchOnce} from "@vueuse/core";
import map from "lodash/map";
import { useQueryClient } from "@tanstack/vue-query";
import sumBy from "lodash/sumBy";

export const useCart = () => {
  const { isLoggedIn, user } = useAuth();
  const client = useApiClient();
  const queryClient = useQueryClient();

  const selected = useCookie<string[]>("cart.selected", {
    default: () => [],
    maxAge: 86400 * 30,
    sameSite: "lax",
  });
  const itemsQualities = ref<Record<string, number>>({});

  const fetchData = async () => {
    if (!isLoggedIn.value) {
      return [];
    }

    const response = await client.cart.cartControllerFind();
    return response.data;
  };

  const {
    data,
    isLoading: isCartLoading,
    isRefetching: isCartRefetching,
    refetch,
  } = useApi<CartDto[]>(fetchData, ["cart"], {
    refetchOnMount: false,
  });

  const { isLoading: isExecutingUpdate, execute: updateCartItems } =
    useAsyncState(
      async () => {
        const updateItems = map(
          Object.entries(itemsQualities.value),
          ([uuid, quantity]) => ({
            uuid,
            quantity,
          }),
        );
        const items = await client.cart
          .cartControllerUpdate(updateItems)
          .then((res) => res.data as any as CartDto[]);

        const updated = data.value?.map((cartItem) => {
          const matchingItem = items.find(
            (item) => item.uuid === cartItem.uuid,
          );
          if (matchingItem) {
            return Object.assign(
              { ...cartItem },
              { quantity: matchingItem.quantity },
            );
          } else return cartItem;
        });

        queryClient.setQueryData(["cart"], updated);
        itemsQualities.value = {};
      },
      undefined,
      {
        immediate: false,
      },
    );
  const {
    debouncedFunction: updateCartItemsDebounce,
    pending: isDebounceUpdate,
  } = useDebouncedFunction(updateCartItems, 1000);

  const isLoading = useIsLoading(isCartRefetching, isCartLoading);
  const isLoadingUpdate = useIsLoading(isDebounceUpdate, isExecutingUpdate);

  const updateItemQuality = async (uuid: string, quality: number) => {
    if (!quality || quality < 1) return;
    itemsQualities.value[uuid] = quality;
    await updateCartItemsDebounce();
  };

  const getMaxQuantitySale = (product: ProductDto, quantity: number) => {
    if (quantity >= 100 && product.quantitySales_5) return 100;
    if (quantity >= 40 && product.quantitySales_10) return 40;
    if (quantity >= 20 && product.quantitySales_20) return 20;
    if (quantity >= 10 && product.quantitySales_40) return 10;
    if (quantity >= 5 && product.quantitySales_100) return 5;
    return 0;
  };

  const calculateDiscountedPrice = (
    price: number,
    sale: number,
    buyingPrice: number,
  ) => {
    const discountedPrice = price * (1 - sale / 100);
    return Math.max(discountedPrice, buyingPrice);
  };

  const totalPrice = computed(() =>
    sumBy(
      data.value?.filter(({ uuid }) => selected.value.includes(uuid)),
      (value) => value.product.price * value.quantity,
    ),
  );

  const totalQuantity = computed(() =>
    sumBy(
      data.value?.filter(({ uuid }) => selected.value.includes(uuid)),
      "quantity",
    ),
  );

  const totalPriceWithSale = computed(() =>
    sumBy(
      data.value?.filter(({ uuid }) => selected.value.includes(uuid)),
      (value) => {
        const maxQuantitySale = getMaxQuantitySale(value.product, totalQuantity.value);
        const totalSale = (value.product.sale || 0) + maxQuantitySale + (user.value?.discount || 0)
        const applicableSale = Math.min(totalSale ?? 0, 99);
        const discountedPrice = value.product.price * (1 - (applicableSale / 100))

        return Math.max(discountedPrice, value.product.buyingPrice) * value.quantity;
      },
    ),
  );

  const select = (uuid: string) => {
    const index = selected.value.indexOf(uuid);
    if (index === -1) {
      selected.value.push(uuid);
    } else {
      selected.value.splice(index, 1);
    }
  };
  const selectAll = () => {
    if (data.value) {
      if (selected.value.length === data.value.length) {
        selected.value = []; // Deselect all if all are selected
      } else {
        selected.value = data.value.map((item) => item.uuid); // Select all
      }
    }
  };

  async function deleteItem(uuid: string) {
    await client.cart.cartControllerDelete(uuid);

    const index = selected.value.indexOf(uuid);
    if (index !== -1) {
      selected.value.splice(index, 1);
    }

    await refetch()
  }

  const create = async (data: CartCreateDto) => {
    const item = await client.cart.cartControllerCreate(data).then(res => res.data)
    await refetch()
    select(item.uuid);
  }

  async function clear() {
    await client.cart.cartControllerClear();
    selected.value = [];
  }

  return {
    data,
    isLoading,
    isLoadingUpdate,
    refetch,
    clear,
    create,
    updateItemQuality,
    deleteItem,
    selected,
    select,
    selectAll,
    totalPrice,
    totalPriceWithSale,
    totalQuantity
  };
};
