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
  const inStock = Math.random() < 0.5
  console.log(id, label)
  return { id, label, summary, inStock }
}

const generateListStrainDataOfLength = (length: number) =>
  [...new Array(length)].map(() => generateRandomData())

export { generateListStrainDataOfLength }
