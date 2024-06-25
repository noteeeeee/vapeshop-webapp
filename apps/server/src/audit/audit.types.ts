export enum AuditType {
  USER_CREATED = "user_created",
  ORDER_CREATED = "order_created",
  ORDER_STATUS_UPDATED = "order_status_updated",
  BALANCE_INCREMENT = "balance_increment",
  BALANCE_DECREMENT = "balance_decrement",
  BALANCE_REFERRAL_INCREMENT = "balance_referral_increment",
  BALANCE_REFERRAL_DECREMENT = "balance_referral_decrement",
  PRODUCT_STOCK_INCREMENT = "product_stock_increment",
  PRODUCT_STOCK_DECREMENT = "product_stock_decrement",
  PRODUCT_OUT_OF_STOCK = "product_out_of_stock",
}