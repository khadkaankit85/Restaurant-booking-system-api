export interface reservationType {
  reservedById: number;
  tableId: number;
  reservedItems: Array<{
    itemId: number;
    quantity: number;
  }>;
}

export interface ReservedItem {
  itemId: number; // The ID of the item being reserved
  quantity: number; // The quantity of the item being reserved
}
