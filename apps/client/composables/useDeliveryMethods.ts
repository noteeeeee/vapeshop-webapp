export default function useDeliveryMethods() {
  const deliveryMethods = ref([
    {
      name: 'Яндекс (по Минску)',
      id: 'yandex_post_minsk',
      img: 'yandex_post_minsk.jpeg',
      imageWithFrame: false
    },
    {
      name: 'Евро Почта',
      id: 'euro_post',
      img: 'euro_post.svg',
      imageWithFrame: true
    },
    {
      name: 'Бел Почта',
      id: 'bel_post',
      img: 'bel_post.svg',
      imageWithFrame: false
    }
  ]);

  const findOne = (id: string) => {
    return deliveryMethods.value.find(method => method.id === id);
  };

  return {
    deliveryMethods,
    findOne
  };
}