// ISO 3166-1 alpha-2 https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
const countryToFlag = (isoCode: string) => {
  // verify fromCodePoint is a valid method for browser
  if (String.fromCodePoint !== undefined) {
    return isoCode.replaceAll(/./g, (char: string) =>
      String.fromCodePoint((char.codePointAt(0) as number) + 127_397),
    )
  }
  return isoCode
}

export { countryToFlag }
