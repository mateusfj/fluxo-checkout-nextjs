import { IProduct } from "@/@types/products/IProduct";

const products: IProduct[] = [
  {
    id: "p1",
    name: "Auriculares SonicWave X1",
    description:
      "Fones de ouvido sem fio com cancelamento ativo de ruído e bateria de até 30 horas.",
    price: 349.9,
    imageUrl: "images/products/phone-1.webp",
  },
  {
    id: "p2",
    name: "Headset PulseBeat 500",
    description:
      "Fones Bluetooth com graves potentes, microfone embutido e design ergonômico.",
    price: 279.9,
    imageUrl: "images/products/phone-2.webp",
  },
  {
    id: "p3",
    name: "Headphones CloudTune Pro",
    description:
      "Fones over-ear confortáveis, ideais para longas sessões de uso, com som de alta fidelidade.",
    price: 499.9,
    imageUrl: "images/products/phone-3.webp",
  },
  {
    id: "p4",
    name: "Earbuds AeroSound Lite",
    description:
      "Fones de ouvido compactos, resistentes à água e com estojo de carregamento rápido.",
    price: 199.9,
    imageUrl: "images/products/phone-4.webp",
  },
];

export async function getAllProducts(): Promise<IProduct[]> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return products;
}
