const cnsMask = (value: string) => {
  return value
    .replace(/\D/g, "") // remove tudo que não é número
    .replace(/(\d{3})(\d)/, "$1 $2") // 000 0000 ...
    .replace(/(\d{4})(\d)/, "$1 $2") // 000 0000 0000 ...
    .replace(/(\d{4})(\d)/, "$1 $2") // ... 0000 0000
    .substring(0, 18); // evita digitar além do necessário
};

export { cnsMask };
