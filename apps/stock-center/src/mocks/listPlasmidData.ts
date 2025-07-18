const generateRandomData = () => {
  const id = `DBP${Math.floor(Math.random() * 100_000)}`
  const name = `${String.fromCodePoint(
    97 + Math.floor(Math.random() * 26),
  ).toUpperCase()}${String.fromCodePoint(
    97 + Math.floor(Math.random() * 26),
  ).toUpperCase()}rA-`
  const summary = `${name} (p${String.fromCodePoint(
    97 + Math.floor(Math.random() * 26),
  ).toLowerCase()}r${String.fromCodePoint(
    97 + Math.floor(Math.random() * 26),
  ).toLowerCase()}vark) null mutant (β-catenin knock-out)`
  const in_stock = Math.random() < 0.5
  return { id, name, summary, in_stock }
}

const generateListPlasmidDataOfLength = (length: number) =>
  Array.from({ length })
    .fill(0)
    .map(() => generateRandomData())

export { generateListPlasmidDataOfLength }
