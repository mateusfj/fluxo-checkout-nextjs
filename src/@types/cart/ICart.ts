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
  id: string;
  productId: string;
  quantity: number;
  description: string;
  name: string;
  price: number;
  imageUrl: string;
};
