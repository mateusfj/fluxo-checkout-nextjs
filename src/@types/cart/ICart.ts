export type IItemCartDetailed = {
  id: string;
  productId: string;
  quantity: number;
  description: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type IItemCartOrder = {
  product_id: string;
  quantity: number;
};
