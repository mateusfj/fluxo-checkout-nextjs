import { IItemCartDetailed } from "./ICart";

export interface CartStoreState {
  cartsByUser: Record<string, IItemCartDetailed[]>;
  userId: string;
}

export interface CartStoreActions {
  setUserId: (userId: string) => void;
  addItem: (item: IItemCartDetailed) => void;
  getUserCart: () => IItemCartDetailed[];
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

export interface CartStore extends CartStoreState, CartStoreActions {}
