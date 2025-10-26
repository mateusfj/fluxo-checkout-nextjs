const realMask = (value: string): string => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^0+/, "");

  if (value === "") {
    return "R$ 0,00";
  }

  if (value.length <= 2) {
    return `R$ 0,${value.padStart(2, "0")}`;
  } else {
    value = value.replace(/(\d{2})$/, ",$1");
  }

  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  if (!value.startsWith("R$")) {
    value = `R$ ${value}`;
  }

  return value;
};

const realUnmask = (value: string): string => {
  value = value.replace(/[^\d,-]/g, "");
  value = value.replace(",", ".");
  value = value.replace(/^0+(?=\d)/, "");

  return value;
};

export { realMask, realUnmask };
