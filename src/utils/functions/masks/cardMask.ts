export const cardMask = (value: string) => {
  const digits = value.replace(/\D/g, "");

  const limited = digits.slice(0, 16);

  const formatted = limited.replace(/(\d{4})(?=\d)/g, "$1 ");

  return formatted;
};
