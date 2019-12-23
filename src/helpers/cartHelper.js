const localeMapping = {
  EUR: "€",
  USD: "$",
};

export const priceParser = (centsPrice, locale) => {
  return `${centsPrice / 100} ${localeMapping[locale]}`;
};

export const getTotal = products => {
  return products.reduce(
      (total, item) => total + item.total,
      0
  )
}