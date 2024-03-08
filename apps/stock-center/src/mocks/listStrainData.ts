const generateRandomData = () => {
  const id = `DBS${Math.floor(Math.random() * 100_000)}`
  const label = `${String.fromCodePoint(
    97 + Math.floor(Math.random() * 26),
  ).toUpperCase()}${String.fromCodePoint(
    97 + Math.floor(Math.random() * 26),
  ).toUpperCase()}rA-`
  const summary = `${label} (a${String.fromCodePoint(
    97 + Math.floor(Math.random() * 26),
  ).toLowerCase()}r${String.fromCodePoint(
    97 + Math.floor(Math.random() * 26),
  ).toLowerCase()}vark) null mutant (β-catenin knock-out)`
  const in_stock = Math.random() < 0.5
  return { id, label, summary, in_stock }
}

const generateListStrainDataOfLength = (length: number) =>
  new Array(length).fill(0).map(() => generateRandomData())

export { generateListStrainDataOfLength }
