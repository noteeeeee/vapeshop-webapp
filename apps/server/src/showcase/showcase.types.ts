export enum ShowcaseOperation {
  OrderPurchase = 'order_purchase', // Покупка товаров пользователем
  OrderRefund = 'order_refund', // Возврат заказа пользователем

  StockAcquisition = 'stock_acquisition', // Закупка новых товаров на склад
  StockReceipt = 'stock_receipt', // Оприходование товаров на склад
  StockWriteOff = 'stock_receipt', // Списание товаров со склада
  StockInventory = 'stock_inventory', // Инвентаризация на складе
}
