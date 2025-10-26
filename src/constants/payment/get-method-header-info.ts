const METHOD_INFO_HEADER: {
  [key: string]: { title: string; description: string };
} = {
  pix: {
    title: "Pagamento via PIX",
    description:
      "Escaneie o QR Code ou copie o código PIX para realizar o pagamento",
  },
  boleto: {
    title: "Pagamento via Boleto",
    description: "Pague o boleto bancário em qualquer banco ou casa lotérica",
  },
};

const getMethodHeaderInfo = (method: string) => {
  return METHOD_INFO_HEADER[method];
};

export { getMethodHeaderInfo };
