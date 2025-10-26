import { IProduct } from "@/@types/products/IProduct";

const products: IProduct[] = [
  {
    id: "p1",
    name: "Auriculares SonicWave X1",
    description:
      "Fones de ouvido sem fio com cancelamento ativo de ruído e bateria de até 30 horas.",
    price: 349.9,
    imageUrl: "/images/products/phone-1.webp",
  },
  {
    id: "p2",
    name: "Headset PulseBeat 500",
    description:
      "Fones Bluetooth com graves potentes, microfone embutido e design ergonômico.",
    price: 279.9,
    imageUrl: "/images/products/phone-2.webp",
  },
  {
    id: "p3",
    name: "Headphones CloudTune Pro",
    description:
      "Fones over-ear confortáveis, ideais para longas sessões de uso, com som de alta fidelidade.",
    price: 499.9,
    imageUrl: "/images/products/phone-3.webp",
  },
  {
    id: "p4",
    name: "Earbuds AeroSound Lite",
    description:
      "Fones de ouvido compactos, resistentes à água e com estojo de carregamento rápido.",
    price: 199.9,
    imageUrl: "/images/products/phone-4.webp",
  },
  {
    id: "p5",
    name: "Headset BassMaster 900",
    description:
      "Fones com tecnologia de reforço de graves e almofadas de couro sintético para máximo conforto.",
    price: 429.9,
    imageUrl: "/images/products/phone-5.webp",
  },
  {
    id: "p6",
    name: "Earbuds FlowAir S2",
    description:
      "Fones true wireless com conexão estável Bluetooth 5.3 e resistência ao suor, ideais para treinos.",
    price: 239.9,
    imageUrl: "/images/products/phone-6.webp",
  },
  {
    id: "p7",
    name: "Headphones StudioWave Elite",
    description:
      "Fones over-ear premium com drivers de alta precisão e isolamento acústico profissional.",
    price: 599.9,
    imageUrl: "/images/products/phone-7.webp",
  },
  {
    id: "p8",
    name: "Auriculares NeoSound Mini",
    description:
      "Fones leves e compactos, com assistente de voz integrado e bateria de até 20 horas.",
    price: 189.9,
    imageUrl: "/images/products/phone-8.webp",
  },
];

export async function getAllProducts(): Promise<IProduct[]> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return products;
}
