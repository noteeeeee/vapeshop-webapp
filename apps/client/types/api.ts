/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserDto {
  /**
   * The unique identifier for the user
   * @example 1234567890
   */
  id: number;
  /**
   * The first name of the user
   * @example "John"
   */
  firstName: string;
  /**
   * The username of the user
   * @example "john_doe"
   */
  username?: string;
  /**
   * Indicates if the user is active
   * @example true
   */
  isActive?: boolean;
  /**
   * Indicates if the user is an admin
   * @example true
   */
  isAdmin?: boolean;
  /**
   * Indicates if the user is banned
   * @example false
   */
  isBanned?: boolean;
  /**
   * The balance of the user
   * @default 0
   * @example 100
   */
  balance: number;
  /**
   * The referral balance of the user
   * @default 0
   * @example 100
   */
  referralBalance: number;
  /**
   * The discount for the user
   * @example 10
   */
  discount?: number;
  /**
   * The date when the user was last updated
   * @format date-time
   * @example "2024-06-19T12:34:56.789Z"
   */
  updated: string;
  /**
   * The date when the user was created
   * @format date-time
   * @example "2024-06-19T12:34:56.789Z"
   */
  created: string;
}

export interface ReferralStatsDto {
  /** Number of referrals associated with the partner */
  referralCount: number;
}

export interface CategoryDto {
  /**
   * The unique identifier for the category
   * @example 1
   */
  id: number;
  /**
   * The name of the category
   * @example "Liquid"
   */
  name: string;
  /** The SVG image for the category */
  image?: string;
  /**
   * The index of the category
   * @example 10
   */
  index?: number;
  /**
   * The date when the category was last updated
   * @format date-time
   * @example "2024-06-19T12:34:56.789Z"
   */
  updated: string;
  /**
   * The date when the category was created
   * @format date-time
   * @example "2024-06-19T12:34:56.789Z"
   */
  created: string;
}

export interface CreateCategoryDto {
  /**
   * The name of the category
   * @example "Liquid"
   */
  name: string;
  /** The image for the category */
  image?: string;
}

export interface UpdateCategoryDto {
  /**
   * The name of the category
   * @example "Liquid"
   */
  name?: string;
  /** The SVG image for the category */
  image?: string;
}

export interface BrandDto {
  /**
   * The unique identifier for the brand
   * @example 1
   */
  id: number;
  /**
   * The name of the brand
   * @example "HotSpot"
   */
  name: string;
  /**
   * The index of the brand
   * @example 10
   */
  index?: number;
  /**
   * The date when the brand was last updated
   * @format date-time
   * @example "2024-06-19T12:34:56.789Z"
   */
  updated: string;
  /**
   * The date when the brand was created
   * @format date-time
   * @example "2024-06-19T12:34:56.789Z"
   */
  created: string;
}

export interface CreateBrandDto {
  /**
   * The name of the brand
   * @example "HotSpot"
   */
  name: string;
}

export interface UpdateBrandDto {
  /**
   * The name of the brand
   * @example "HotSpot"
   */
  name?: string;
}

export interface CategoryFilterDto {
  /**
   * The unique identifier for the filter
   * @example 1
   */
  id: number;
  /**
   * The name of the filter
   * @example "Strong"
   */
  name: string;
  /**
   * The index of the filter
   * @example 10
   */
  index?: number;
}

export interface CreateFilterDto {
  /**
   * The name of the filter
   * @example "Strong"
   */
  name: string;
  /**
   * The ID of the category
   * @example 1
   */
  categoryID: number;
}

export interface UpdateFilterDto {
  /**
   * The name of the filter
   * @example "Strong"
   */
  name?: string;
}

export interface PaginatedMetaDocumented {
  /** Number of items per page */
  itemsPerPage: number;
  /** Total number of items */
  totalItems: number;
  /** Current requested page */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Sorting by columns */
  sortBy?: (string | 'ASC' | 'DESC')[][];
  /** Search by fields */
  searchBy?: string[];
  /** Search term */
  search?: string;
  /** List of selected fields */
  select?: string[];
  /** Filters that applied to the query */
  filter?: object;
}

export interface PaginatedLinksDocumented {
  /** Link to first page */
  first?: string;
  /** Link to previous page */
  previous?: string;
  /** Link to current page */
  current?: string;
  /** Link to next page */
  next?: string;
  /** Link to last page */
  last?: string;
}

export interface PaginatedDocumented {
  /** Array of entities */
  data: object[];
  /** Pagination Metadata */
  meta: PaginatedMetaDocumented;
  /** Links to pages */
  links: PaginatedLinksDocumented;
}

export interface ProductDto {
  /**
   * The unique identifier for the product
   * @example 1
   */
  id: number;
  /**
   * The name of the product
   * @example "Product Name"
   */
  name: string;
  /** The category the product belongs to */
  category: CategoryDto | null;
  /**
   * The flavor of the product
   * @example "Fruity"
   */
  brand?: string | null;
  /**
   * The flavor of the product
   * @example "Fruity"
   */
  flavor?: string | null;
  /**
   * The nicotine type of the product
   * @example "Salty"
   */
  nicotine?: string | null;
  /**
   * The strength of the product
   * @example "6 MG"
   */
  strength?: string | null;
  quantitySales_5?: number;
  quantitySales_10?: number;
  quantitySales_20?: number;
  quantitySales_40?: number;
  quantitySales_100?: number;
  /**
   * The number of times the product has been purchased
   * @example 100
   */
  purchased: number;
  /**
   * The price of the product
   * @example 20
   */
  price: number;
  /**
   * The price of the product
   * @example 20
   */
  buyingPrice: number;
  /**
   * The sale percentage of the product
   * @example 20
   */
  sale: number | null;
  /** The storage image ID of the product */
  image: string | null;
  /**
   * The number of items in stock
   * @example 10
   */
  inStock: number;
  /**
   * The date when the product was last updated
   * @format date-time
   * @example "2024-06-19T12:34:56.789Z"
   */
  updated: string;
  /**
   * The date when the product was created
   * @format date-time
   * @example "2024-06-19T12:34:56.789Z"
   */
  created: string;
}

export interface CreateProductDto {
  /**
   * The name of the product
   * @example "Product Name"
   */
  name: string;
  /**
   * The ID of the category the product belongs to
   * @example 1
   */
  categoryID?: number;
  /**
   * The flavor of the product
   * @example "Fruity"
   */
  brand?: string | null;
  /**
   * The flavor of the product
   * @example "Fruity"
   */
  flavor?: string | null;
  /**
   * The nicotine type of the product
   * @example "Salty"
   */
  nicotine?: string | null;
  /**
   * The strength of the product
   * @example "6 MG"
   */
  strength?: string | null;
  quantitySales_5?: number;
  quantitySales_10?: number;
  quantitySales_20?: number;
  quantitySales_40?: number;
  quantitySales_100?: number;
  /**
   * The price of the product
   * @example 20
   */
  price: number;
  /**
   * The price of the product
   * @example 20
   */
  buyingPrice: number;
  /**
   * The sale percentage of the product
   * @example 20
   */
  sale?: number;
  /** The image URL of the product */
  image?: string;
  /**
   * The number of items in stock
   * @example 10
   */
  inStock?: number;
}

export interface UpdateProductDto {
  /**
   * The name of the product
   * @example "Product Name"
   */
  name?: string;
  /**
   * The ID of the category the product belongs to
   * @example 1
   */
  categoryID?: number;
  /**
   * The flavor of the product
   * @example "Fruity"
   */
  brand?: string | null;
  /**
   * The flavor of the product
   * @example "Fruity"
   */
  flavor?: string | null;
  /**
   * The nicotine type of the product
   * @example "Salty"
   */
  nicotine?: string | null;
  /**
   * The strength of the product
   * @example "6 MG"
   */
  strength?: string | null;
  /**
   * The price of the product
   * @example 20
   */
  price: number;
  /**
   * The price of the product
   * @example 20
   */
  buyingPrice: number;
  quantitySales_5?: number;
  quantitySales_10?: number;
  quantitySales_20?: number;
  quantitySales_40?: number;
  quantitySales_100?: number;
  /**
   * The sale percentage of the product
   * @example 20
   */
  sale?: number;
  /** The image URL of the product */
  image?: string | null;
  /**
   * The number of items in stock
   * @example 10
   */
  inStock?: number;
}

export interface UpdateStockDto {
  /**
   * The quantity to increment or decrement
   * @example 10
   */
  quantity: number;
  /**
   * The buying price of the new stock
   * @example 5.5
   */
  buyingPrice?: number;
  /**
   * The selling price of the new stock
   * @example 7.5
   */
  price?: number;
}

export interface OrderCreateStatusDto {
  method: 'yandex_post_minsk' | 'bel_post' | 'euro_post';
  /** The full name of the user */
  fullName?: string;
  /** The phone number of the user */
  phone: string;
  /** The city of the address */
  region?: string;
  /** The city of the address */
  city?: string;
  /** The address */
  address: string;
  /** The zip code */
  zipCode?: string;
  /** UUIDs of cart items */
  cartUUIDs: string[];
  save?: boolean;
}

export interface CartDto {
  /** The UUID of the cart item */
  uuid: string;
  /** The product details associated with the cart item */
  product: ProductDto;
  /** The quantity of the product in the cart */
  quantity: number;
  /** The price of the item */
  price?: number;
  /** The sale price of the item */
  sale?: number;
  /** The final price of the product after applying any sale discounts */
  priceWithSale: number;
  /**
   * The date when the cart item was last updated
   * @format date-time
   */
  updated: string;
  /**
   * The date when the cart item was created
   * @format date-time
   */
  created: string;
}

/** The status of the order */
export enum OrderStatus {
  AwaitingPayment = 'awaiting_payment',
  Processing = 'processing',
  InDelivery = 'in_delivery',
  Completed = 'completed',
  Canceled = 'canceled',
}

export interface DeliveryDto {
  method: 'yandex_post_minsk' | 'bel_post' | 'euro_post';
  /** The full name of the user */
  fullName?: string;
  /** The phone number of the user */
  phone: string;
  /** The city of the address */
  region?: string;
  /** The city of the address */
  city?: string;
  /** The address */
  address: string;
  /** The zip code */
  zipCode?: string;
}

export interface OrderCreateResponseDto {
  /** The ID of the order */
  id: number;
  /** Items included in the order */
  items: CartDto[];
  /** The status of the order */
  status: OrderStatus;
  /** The total price of the order */
  totalPrice: number;
  /** The total price of the order with sale */
  totalPriceWithSale: number;
  /** The delivery data associated with the order */
  deliveryData: DeliveryDto;
  /**
   * The date when the order was last updated
   * @format date-time
   */
  updated: string;
  /**
   * The date when the order was created
   * @format date-time
   */
  created: string;
  /**
   * The date when the order was expired and deleted
   * @format date-time
   */
  expire: string;
  /** Indicates whether some products were excluded from the order due to insufficient stock. */
  productsExcluded: boolean;
}

export interface OrderStatsDto {
  profitToday: number;
  soldItemsToday: number;
  profitTotal: number;
  soldItemsTotal: number;
}

export interface OrderDto {
  /** The ID of the order */
  id: number;
  /** Items included in the order */
  items: CartDto[];
  /** The status of the order */
  status: OrderStatus;
  /** The total price of the order */
  totalPrice: number;
  /** The total price of the order with sale */
  totalPriceWithSale: number;
  /** The delivery data associated with the order */
  deliveryData: DeliveryDto;
  /**
   * The date when the order was last updated
   * @format date-time
   */
  updated: string;
  /**
   * The date when the order was created
   * @format date-time
   */
  created: string;
  /**
   * The date when the order was expired and deleted
   * @format date-time
   */
  expire: string;
}

export interface CartCreateDto {
  /** The ID of the product to add to the cart */
  productID: number;
  /** The quantity of the product to add to the cart */
  quantity: number;
}

export interface CartUpdateDto {
  /** The UUID of the cart item to update */
  uuid: string;
  /** The updated quantity of the product in the cart */
  quantity: number;
}

export interface OrderAdminResponseDto {
  /** The ID of the order */
  id: number;
  /** Items included in the order */
  items: CartDto[];
  /** The status of the order */
  status: OrderStatus;
  /** The total price of the order */
  totalPrice: number;
  /** The total price of the order with sale */
  totalPriceWithSale: number;
  /** The delivery data associated with the order */
  deliveryData: DeliveryDto;
  /**
   * The date when the order was last updated
   * @format date-time
   */
  updated: string;
  /**
   * The date when the order was created
   * @format date-time
   */
  created: string;
  /**
   * The date when the order was expired and deleted
   * @format date-time
   */
  expire: string;
  user: UserDto;
}

export interface RevenueByDayDto {
  /** The date for the revenue */
  created: string;
  /** The revenue for the date */
  revenue: number;
}

export interface OrderUpdateDto {
  /** The status of the order */
  status: OrderStatus;
  /** Indicates whether to move the order to the cart */
  moveToCart?: boolean;
}

export interface UsersStats {
  today: number;
  total: number;
}

export interface UserUpdateDto {
  /** Flag indicating if the user is banned */
  isBanned: boolean;
  /** Flag indicating if the user is an administrator */
  isAdmin: boolean;
  /** The balance of the user */
  balance: number;
  /** The referral balance of the user */
  referralBalance: number;
}

export interface AuditDto {
  /**
   * ID of the audit
   * @example 1
   */
  id: number;
  /**
   * Type of the audit event
   * @example "user_created"
   */
  type: string;
  /** ID of the user */
  user?: UserDto;
  /** ID of the order */
  order?: OrderDto;
  /** ID of the product */
  product?: ProductDto;
  /** Additional details of the event */
  details?: object;
  /**
   * Creation date of the event
   * @format date-time
   * @example "2024-06-24T12:34:56.789Z"
   */
  created: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title OpenAPI
 * @version 1.0
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  storage = {
    /**
     * No description
     *
     * @tags Storage
     * @name StorageControllerProcess
     * @summary Process file upload
     * @request POST:/storage/filepond/process
     * @secure
     */
    storageControllerProcess: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/storage/filepond/process`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name StorageControllerRevertUpload
     * @summary Revert file upload
     * @request DELETE:/storage/filepond/revert/{id}
     * @secure
     */
    storageControllerRevertUpload: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/storage/filepond/revert/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Storage
     * @name StorageControllerLoadFile
     * @request GET:/storage/filepond/load
     */
    storageControllerLoadFile: (
      query: {
        source: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/storage/filepond/load`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  auth = {
    /**
     * @description Retrieve the current authenticated user profile.
     *
     * @tags Auth
     * @name AuthControllerMe
     * @summary Get current user
     * @request GET:/auth/me
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.request<UserDto, void>({
        path: `/auth/me`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetStats
     * @summary Get referrer statistics
     * @request GET:/users/referral-stats
     */
    usersControllerGetStats: (params: RequestParams = {}) =>
      this.request<ReferralStatsDto, any>({
        path: `/users/referral-stats`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  bot = {
    /**
     * No description
     *
     * @tags bot
     * @name BotControllerAvatar
     * @summary Get user avatar
     * @request GET:/bot/avatar
     */
    botControllerAvatar: (params: RequestParams = {}) =>
      this.request<File, void>({
        path: `/bot/avatar`,
        method: 'GET',
        format: 'blob',
        ...params,
      }),
  };
  categories = {
    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerFindAll
     * @summary Get all categories
     * @request GET:/categories
     */
    categoriesControllerFindAll: (params: RequestParams = {}) =>
      this.request<CategoryDto[], any>({
        path: `/categories`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerCreate
     * @summary Create a new category
     * @request POST:/categories
     */
    categoriesControllerCreate: (data: CreateCategoryDto, params: RequestParams = {}) =>
      this.request<CreateCategoryDto, void>({
        path: `/categories`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerUpdate
     * @summary Update a category by ID
     * @request PATCH:/categories/{id}
     */
    categoriesControllerUpdate: (id: number, data: UpdateCategoryDto, params: RequestParams = {}) =>
      this.request<CategoryDto, void>({
        path: `/categories/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesControllerDelete
     * @summary Delete a category by ID
     * @request DELETE:/categories/{id}
     */
    categoriesControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/categories/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  brands = {
    /**
     * No description
     *
     * @tags Brands
     * @name BrandsControllerFindAll
     * @summary Get all brands
     * @request GET:/brands
     */
    brandsControllerFindAll: (params: RequestParams = {}) =>
      this.request<BrandDto[], any>({
        path: `/brands`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Brands
     * @name BrandsControllerCreate
     * @summary Create a new brand
     * @request POST:/brands
     */
    brandsControllerCreate: (data: CreateBrandDto, params: RequestParams = {}) =>
      this.request<CreateBrandDto, void>({
        path: `/brands`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Brands
     * @name BrandsControllerUpdate
     * @summary Update a brand by ID
     * @request PATCH:/brands/{id}
     */
    brandsControllerUpdate: (id: number, data: UpdateBrandDto, params: RequestParams = {}) =>
      this.request<BrandDto, void>({
        path: `/brands/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Brands
     * @name BrandsControllerDelete
     * @summary Delete a brand by ID
     * @request DELETE:/brands/{id}
     */
    brandsControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/brands/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  filters = {
    /**
     * No description
     *
     * @tags Filters
     * @name CategoryFiltersControllerFindAll
     * @summary Get all filters for category
     * @request GET:/filters/{categoryID}
     */
    categoryFiltersControllerFindAll: (categoryId: number, id: number, params: RequestParams = {}) =>
      this.request<CategoryFilterDto[], any>({
        path: `/filters/${categoryId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Filters
     * @name CategoryFiltersControllerCreate
     * @summary Create a new filter
     * @request POST:/filters
     */
    categoryFiltersControllerCreate: (data: CreateFilterDto, params: RequestParams = {}) =>
      this.request<CreateFilterDto, void>({
        path: `/filters`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Filters
     * @name CategoryFiltersControllerUpdate
     * @summary Update a filter by ID
     * @request PATCH:/filters/{id}
     */
    categoryFiltersControllerUpdate: (id: number, data: UpdateFilterDto, params: RequestParams = {}) =>
      this.request<CategoryFilterDto, void>({
        path: `/filters/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Filters
     * @name CategoryFiltersControllerDelete
     * @summary Delete a filter by ID
     * @request DELETE:/filters/{id}
     */
    categoryFiltersControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/filters/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  products = {
    /**
     * @description Get paginated list of products
     *
     * @tags Products
     * @name ProductsControllerPaginate
     * @summary Paginate Products
     * @request GET:/products/paginate
     */
    productsControllerPaginate: (
      query?: {
        /**
         * Page number to retrieve.If you provide invalid value the default page number will applied
         *         <p>
         *              <b>Example: </b> 1
         *           </p>
         *         <p>
         *              <b>Default Value: </b> 1
         *           </p>
         *
         */
        page?: number;
        /**
         * Number of records per page.
         *       <p>
         *              <b>Example: </b> 20
         *           </p>
         *       <p>
         *              <b>Default Value: </b> 50
         *           </p>
         *       <p>
         *              <b>Max Value: </b> 100
         *           </p>
         *
         *       If provided value is greater than max value, max value will be applied.
         *
         */
        limit?: number;
        /**
         * Filter by price query param.
         *           <p>
         *              <b>Format: </b> filter.price={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.price=$not:$like:John Doe&filter.price=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$btw</li></ul>
         */
        filterPrice?: string[];
        /**
         * Filter by inStock query param.
         *           <p>
         *              <b>Format: </b> filter.inStock={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.inStock=$not:$like:John Doe&filter.inStock=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$and</li>
         * <li>$or</li>
         * <li>$not</li>
         * <li>$eq</li>
         * <li>$gt</li>
         * <li>$gte</li>
         * <li>$in</li>
         * <li>$null</li>
         * <li>$lt</li>
         * <li>$lte</li>
         * <li>$btw</li>
         * <li>$ilike</li>
         * <li>$sw</li>
         * <li>$contains</li></ul>
         */
        filterInStock?: string[];
        /**
         * Parameter to sort by.
         *       <p>To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting</p>
         *       <p>
         *              <b>Format: </b> fieldName:DIRECTION
         *           </p>
         *       <p>
         *              <b>Example: </b> sortBy=id:DESC&sortBy=createdAt:ASC
         *           </p>
         *       <p>
         *              <b>Default Value: </b> id:DESC
         *           </p>
         *       <h4>Available Fields</h4><ul><li>id</li>
         * <li>name</li>
         * <li>price</li>
         * <li>sale</li>
         * <li>created</li>
         * <li>purchased</li>
         * <li>inStock</li></ul>
         *
         */
        sortBy?: (
          | 'id:ASC'
          | 'id:DESC'
          | 'name:ASC'
          | 'name:DESC'
          | 'price:ASC'
          | 'price:DESC'
          | 'sale:ASC'
          | 'sale:DESC'
          | 'created:ASC'
          | 'created:DESC'
          | 'purchased:ASC'
          | 'purchased:DESC'
          | 'inStock:ASC'
          | 'inStock:DESC'
        )[];
        /**
         * Search term to filter result values
         *         <p>
         *              <b>Example: </b> John
         *           </p>
         *         <p>
         *              <b>Default Value: </b> No default value
         *           </p>
         *
         */
        search?: string;
        /**
         * List of fields to search by term to filter result values
         *         <p>
         *              <b>Example: </b> name,id
         *           </p>
         *         <p>
         *              <b>Default Value: </b> By default all fields mentioned below will be used to search by term
         *           </p>
         *         <h4>Available Fields</h4><ul><li>name</li>
         * <li>id</li></ul>
         *
         */
        searchBy?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedDocumented & {
          data?: ProductDto[];
          meta?: {
            select?: string[];
            filter?: {
              price?: string | string[];
              inStock?: string | string[];
            };
          };
        },
        any
      >({
        path: `/products/paginate`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerCreate
     * @summary Create a new product
     * @request POST:/products
     * @secure
     */
    productsControllerCreate: (data: CreateProductDto, params: RequestParams = {}) =>
      this.request<ProductDto, void>({
        path: `/products`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerFindOne
     * @summary Find a product by ID
     * @request GET:/products/{id}
     * @secure
     */
    productsControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<ProductDto, void>({
        path: `/products/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerUpdate
     * @summary Update a product by ID
     * @request PATCH:/products/{id}
     * @secure
     */
    productsControllerUpdate: (id: number, data: UpdateProductDto, params: RequestParams = {}) =>
      this.request<ProductDto, void>({
        path: `/products/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerDelete
     * @summary Delete a product by ID
     * @request DELETE:/products/{id}
     * @secure
     */
    productsControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/products/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerIncrement
     * @summary Increment stock of a product
     * @request PATCH:/products/{id}/increment
     * @secure
     */
    productsControllerIncrement: (id: number, data: UpdateStockDto, params: RequestParams = {}) =>
      this.request<ProductDto, void>({
        path: `/products/${id}/increment`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerDecrement
     * @summary Decrement stock of a product
     * @request PATCH:/products/{id}/decrement
     * @secure
     */
    productsControllerDecrement: (id: number, data: UpdateStockDto, params: RequestParams = {}) =>
      this.request<ProductDto, void>({
        path: `/products/${id}/decrement`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags Orders
     * @name OrdersControllerCreate
     * @summary Create an order
     * @request POST:/orders
     */
    ordersControllerCreate: (data: OrderCreateStatusDto, params: RequestParams = {}) =>
      this.request<OrderCreateResponseDto, any>({
        path: `/orders`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersControllerCursorPaginate
     * @summary Paginate list of orders
     * @request GET:/orders
     */
    ordersControllerCursorPaginate: (
      query?: {
        /**
         * Cursor to navigate through the dataset. This is typically a string representing the last seen value of the sorting field.
         *         <p>
         *              <b>Example: </b> createdAt:2022-01-01T00:00:00Z
         *           </p>
         *
         */
        cursor?: string;
        /**
         * Number of records per page.
         *       <p>
         *              <b>Example: </b> 20
         *           </p>
         *       <p>
         *              <b>Default Value: </b> 20
         *           </p>
         *       <p>
         *              <b>Max Value: </b> 100
         *           </p>
         *
         *       If provided value is greater than max value, max value will be applied.
         *
         */
        limit?: number;
        /**
         * Filter by status query param.
         *           <p>
         *              <b>Format: </b> filter.status={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.status=$not:$like:John Doe&filter.status=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$eq</li>
         * <li>$in</li></ul>
         */
        filterStatus?: string[];
        /**
         * Filter by created query param.
         *           <p>
         *              <b>Format: </b> filter.created={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.created=$not:$like:John Doe&filter.created=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$btw</li></ul>
         */
        filterCreated?: string[];
        /**
         * Filter by userID query param.
         *           <p>
         *              <b>Format: </b> filter.userID={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.userID=$not:$like:John Doe&filter.userID=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$eq</li>
         * <li>$in</li></ul>
         */
        filterUserId?: string[];
        /**
         * Parameter to sort by.
         *       <p>To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting</p>
         *       <p>
         *              <b>Format: </b> fieldName:DIRECTION
         *           </p>
         *       <p>
         *              <b>Example: </b> sortBy=id:DESC&sortBy=createdAt:ASC
         *           </p>
         *       <p>
         *              <b>Default Value: </b> id:DESC
         *           </p>
         *       <h4>Available Fields</h4><ul><li>id</li>
         * <li>created</li>
         * <li>updated</li></ul>
         *
         */
        sortBy?: ('id:ASC' | 'id:DESC' | 'created:ASC' | 'created:DESC' | 'updated:ASC' | 'updated:DESC')[];
        /**
         * Search term to filter result values
         *         <p>
         *              <b>Example: </b> John
         *           </p>
         *         <p>
         *              <b>Default Value: </b> No default value
         *           </p>
         *
         */
        search?: string;
        /**
         * List of fields to search by term to filter result values
         *         <p>
         *              <b>Example: </b> id,items.product.name,userID
         *           </p>
         *         <p>
         *              <b>Default Value: </b> By default all fields mentioned below will be used to search by term
         *           </p>
         *         <h4>Available Fields</h4><ul><li>id</li>
         * <li>items.product.name</li>
         * <li>userID</li></ul>
         *
         */
        searchBy?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedDocumented & {
          data?: OrderDto[];
          meta?: {
            select?: string[];
            filter?: {
              status?: string | string[];
              created?: string | string[];
              userID?: string | string[];
            };
          };
        },
        any
      >({
        path: `/orders`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersControllerGetStats
     * @summary Get order statistics
     * @request GET:/orders/stats
     */
    ordersControllerGetStats: (params: RequestParams = {}) =>
      this.request<OrderStatsDto, any>({
        path: `/orders/stats`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersControllerFindOne
     * @summary Find one order by ID
     * @request GET:/orders/{orderID}
     */
    ordersControllerFindOne: (orderId: number, params: RequestParams = {}) =>
      this.request<OrderDto, any>({
        path: `/orders/${orderId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersControllerPay
     * @summary Pay an order
     * @request PATCH:/orders/{orderID}/pay
     */
    ordersControllerPay: (orderId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${orderId}/pay`,
        method: 'PATCH',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersControllerCancel
     * @summary Cancel an order
     * @request DELETE:/orders/{orderID}/cancel
     */
    ordersControllerCancel: (
      orderId: number,
      query: {
        moveToCart: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orders/${orderId}/cancel`,
        method: 'DELETE',
        query: query,
        ...params,
      }),
  };
  cart = {
    /**
     * No description
     *
     * @tags Cart
     * @name CartControllerFind
     * @summary Find User Cart Items
     * @request GET:/cart
     */
    cartControllerFind: (params: RequestParams = {}) =>
      this.request<CartDto[], any>({
        path: `/cart`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartControllerCreate
     * @summary Add Item to Cart
     * @request POST:/cart
     */
    cartControllerCreate: (data: CartCreateDto, params: RequestParams = {}) =>
      this.request<CartDto, void>({
        path: `/cart`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartControllerUpdate
     * @summary Update Cart Items
     * @request PATCH:/cart
     */
    cartControllerUpdate: (data: CartUpdateDto[], params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/cart`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartControllerClear
     * @summary Update Cart Items
     * @request DELETE:/cart/clear
     */
    cartControllerClear: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cart/clear`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartControllerDelete
     * @summary Delete Cart Item
     * @request DELETE:/cart/{uuid}
     */
    cartControllerDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cart/${uuid}`,
        method: 'DELETE',
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerOrdersPaginate
     * @summary Paginate list of orders
     * @request GET:/admin/orders
     */
    adminControllerOrdersPaginate: (
      query?: {
        /**
         * Page number to retrieve.If you provide invalid value the default page number will applied
         *         <p>
         *              <b>Example: </b> 1
         *           </p>
         *         <p>
         *              <b>Default Value: </b> 1
         *           </p>
         *
         */
        page?: number;
        /**
         * Number of records per page.
         *       <p>
         *              <b>Example: </b> 20
         *           </p>
         *       <p>
         *              <b>Default Value: </b> 50
         *           </p>
         *       <p>
         *              <b>Max Value: </b> 100
         *           </p>
         *
         *       If provided value is greater than max value, max value will be applied.
         *
         */
        limit?: number;
        /**
         * Filter by status query param.
         *           <p>
         *              <b>Format: </b> filter.status={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.status=$not:$like:John Doe&filter.status=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$eq</li>
         * <li>$in</li></ul>
         */
        filterStatus?: string[];
        /**
         * Filter by created query param.
         *           <p>
         *              <b>Format: </b> filter.created={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.created=$not:$like:John Doe&filter.created=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$btw</li></ul>
         */
        filterCreated?: string[];
        /**
         * Filter by userID query param.
         *           <p>
         *              <b>Format: </b> filter.userID={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.userID=$not:$like:John Doe&filter.userID=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$eq</li>
         * <li>$in</li></ul>
         */
        filterUserId?: string[];
        /**
         * Parameter to sort by.
         *       <p>To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting</p>
         *       <p>
         *              <b>Format: </b> fieldName:DIRECTION
         *           </p>
         *       <p>
         *              <b>Example: </b> sortBy=id:DESC&sortBy=createdAt:ASC
         *           </p>
         *       <p>
         *              <b>Default Value: </b> id:DESC
         *           </p>
         *       <h4>Available Fields</h4><ul><li>id</li>
         * <li>created</li>
         * <li>updated</li></ul>
         *
         */
        sortBy?: ('id:ASC' | 'id:DESC' | 'created:ASC' | 'created:DESC' | 'updated:ASC' | 'updated:DESC')[];
        /**
         * Search term to filter result values
         *         <p>
         *              <b>Example: </b> John
         *           </p>
         *         <p>
         *              <b>Default Value: </b> No default value
         *           </p>
         *
         */
        search?: string;
        /**
         * List of fields to search by term to filter result values
         *         <p>
         *              <b>Example: </b> id,items.product.name,userID
         *           </p>
         *         <p>
         *              <b>Default Value: </b> By default all fields mentioned below will be used to search by term
         *           </p>
         *         <h4>Available Fields</h4><ul><li>id</li>
         * <li>items.product.name</li>
         * <li>userID</li></ul>
         *
         */
        searchBy?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/admin/orders`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerOrdersStats
     * @summary Get stats
     * @request GET:/admin/orders/stats
     */
    adminControllerOrdersStats: (params: RequestParams = {}) =>
      this.request<OrderStatsDto[], void>({
        path: `/admin/orders/stats`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerGetRevenueForLast30Days
     * @summary Get revenue for the last 30 days
     * @request GET:/admin/orders/revenue/days
     */
    adminControllerGetRevenueForLast30Days: (params: RequestParams = {}) =>
      this.request<RevenueByDayDto[], void>({
        path: `/admin/orders/revenue/days`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerGetRevenueForLast12Months
     * @summary Get revenue for the last 12 months
     * @request GET:/admin/orders/revenue/months
     */
    adminControllerGetRevenueForLast12Months: (params: RequestParams = {}) =>
      this.request<RevenueByDayDto[], void>({
        path: `/admin/orders/revenue/months`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerOrdersFindOne
     * @summary Get an order
     * @request GET:/admin/orders/{orderID}
     */
    adminControllerOrdersFindOne: (orderId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/admin/orders/${orderId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerOrdersUpdate
     * @summary Update an order
     * @request PATCH:/admin/orders/{orderID}
     */
    adminControllerOrdersUpdate: (orderId: number, data: OrderUpdateDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/admin/orders/${orderId}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerOrdersDelete
     * @summary Delete an order
     * @request DELETE:/admin/orders/{orderID}
     */
    adminControllerOrdersDelete: (orderId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/admin/orders/${orderId}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerUsersPaginate
     * @summary Paginate list of users
     * @request GET:/admin/users
     */
    adminControllerUsersPaginate: (
      query?: {
        /**
         * Page number to retrieve.If you provide invalid value the default page number will applied
         *         <p>
         *              <b>Example: </b> 1
         *           </p>
         *         <p>
         *              <b>Default Value: </b> 1
         *           </p>
         *
         */
        page?: number;
        /**
         * Number of records per page.
         *       <p>
         *              <b>Example: </b> 20
         *           </p>
         *       <p>
         *              <b>Default Value: </b> 50
         *           </p>
         *       <p>
         *              <b>Max Value: </b> 100
         *           </p>
         *
         *       If provided value is greater than max value, max value will be applied.
         *
         */
        limit?: number;
        /**
         * Parameter to sort by.
         *       <p>To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting</p>
         *       <p>
         *              <b>Format: </b> fieldName:DIRECTION
         *           </p>
         *       <p>
         *              <b>Example: </b> sortBy=id:DESC&sortBy=createdAt:ASC
         *           </p>
         *       <p>
         *              <b>Default Value: </b> id:DESC
         *           </p>
         *       <h4>Available Fields</h4><ul><li>id</li>
         * <li>created</li></ul>
         *
         */
        sortBy?: ('id:ASC' | 'id:DESC' | 'created:ASC' | 'created:DESC')[];
        /**
         * Search term to filter result values
         *         <p>
         *              <b>Example: </b> John
         *           </p>
         *         <p>
         *              <b>Default Value: </b> No default value
         *           </p>
         *
         */
        search?: string;
        /**
         * List of fields to search by term to filter result values
         *         <p>
         *              <b>Example: </b> id,firstName,username
         *           </p>
         *         <p>
         *              <b>Default Value: </b> By default all fields mentioned below will be used to search by term
         *           </p>
         *         <h4>Available Fields</h4><ul><li>id</li>
         * <li>firstName</li>
         * <li>username</li></ul>
         *
         */
        searchBy?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/admin/users`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerUsersStats
     * @summary Get stats
     * @request GET:/admin/users/stats
     */
    adminControllerUsersStats: (params: RequestParams = {}) =>
      this.request<UsersStats[], void>({
        path: `/admin/users/stats`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerUserFondOne
     * @summary Find user
     * @request GET:/admin/users/{id}
     */
    adminControllerUserFondOne: (id: number, params: RequestParams = {}) =>
      this.request<UserDto, void>({
        path: `/admin/users/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerUpdateUser
     * @summary Update user
     * @request PATCH:/admin/users/{id}
     */
    adminControllerUpdateUser: (id: number, data: UserUpdateDto, params: RequestParams = {}) =>
      this.request<UserDto, void>({
        path: `/admin/users/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerDeleteUser
     * @summary Delete user
     * @request DELETE:/admin/users/{id}
     */
    adminControllerDeleteUser: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/admin/users/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  audit = {
    /**
     * No description
     *
     * @tags Audit
     * @name AuditControllerCursorPaginate
     * @summary Cursor paginate list of audit entries
     * @request GET:/audit
     */
    auditControllerCursorPaginate: (
      query?: {
        /**
         * Cursor to navigate through the dataset. This is typically a string representing the last seen value of the sorting field.
         *         <p>
         *              <b>Example: </b> createdAt:2022-01-01T00:00:00Z
         *           </p>
         *
         */
        cursor?: string;
        /**
         * Number of records per page.
         *       <p>
         *              <b>Example: </b> 20
         *           </p>
         *       <p>
         *              <b>Default Value: </b> 20
         *           </p>
         *       <p>
         *              <b>Max Value: </b> 100
         *           </p>
         *
         *       If provided value is greater than max value, max value will be applied.
         *
         */
        limit?: number;
        /**
         * Filter by status query param.
         *           <p>
         *              <b>Format: </b> filter.status={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.status=$not:$like:John Doe&filter.status=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$eq</li>
         * <li>$in</li></ul>
         */
        filterStatus?: string[];
        /**
         * Filter by created query param.
         *           <p>
         *              <b>Format: </b> filter.created={$not}:OPERATION:VALUE
         *           </p>
         *           <p>
         *              <b>Example: </b> filter.created=$not:$like:John Doe&filter.created=like:John
         *           </p>
         *           <h4>Available Operations</h4><ul><li>$btw</li></ul>
         */
        filterCreated?: string[];
        /**
         * Parameter to sort by.
         *       <p>To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting</p>
         *       <p>
         *              <b>Format: </b> fieldName:DIRECTION
         *           </p>
         *       <p>
         *              <b>Example: </b> sortBy=id:DESC&sortBy=createdAt:ASC
         *           </p>
         *       <p>
         *              <b>Default Value: </b> id:DESC
         *           </p>
         *       <h4>Available Fields</h4><ul><li>id</li>
         * <li>created</li></ul>
         *
         */
        sortBy?: ('id:ASC' | 'id:DESC' | 'created:ASC' | 'created:DESC')[];
        /**
         * Search term to filter result values
         *         <p>
         *              <b>Example: </b> John
         *           </p>
         *         <p>
         *              <b>Default Value: </b> No default value
         *           </p>
         *
         */
        search?: string;
        /**
         * List of fields to search by term to filter result values
         *         <p>
         *              <b>Example: </b> id
         *           </p>
         *         <p>
         *              <b>Default Value: </b> By default all fields mentioned below will be used to search by term
         *           </p>
         *         <h4>Available Fields</h4><ul><li>id</li></ul>
         *
         */
        searchBy?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedDocumented & {
          data?: AuditDto[];
          meta?: {
            select?: string[];
            filter?: {
              status?: string | string[];
              created?: string | string[];
            };
          };
        },
        any
      >({
        path: `/audit`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
}
