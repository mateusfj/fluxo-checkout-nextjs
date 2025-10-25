const moneyMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
};

const unMaskMoney = (value: string) => {
  return value.replace(/\./g, "").replace(",", ".");
};

const numContaMask = (value: string) => {
  return value.replace(/[^\d-]/g, "");
};

const formatToBRLMask = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export { formatToBRLMask, moneyMask, numContaMask, unMaskMoney };
