export type ICart = {
  id: string;
  userId: string;
};

export type IItemCart = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
};

export type IItemCartDetailed = {
  product: IProduct;
  subtotal: number;
} & IItemCart;
