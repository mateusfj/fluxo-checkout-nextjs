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

export { moneyMask, numContaMask, unMaskMoney };
