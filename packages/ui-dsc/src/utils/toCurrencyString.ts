const currencyStringFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
})

const toCurrencyString = (value: number) =>
  currencyStringFormatter.format(value)

export { toCurrencyString }
