import PhenotypeRow from "./PhenotypeRow"

interface RenderPhenotypesProps {
  __typename?: "Strain"
  id: string
  label: string
  characteristics?: Array<string> | undefined
  in_stock: boolean
  phenotypes?: Array<{
    __typename?: "Phenotype"
    phenotype: string
    publication?: {
      __typename?: "Publication"
      id: string
      title: string
      journal: string
      pages?: string | undefined
      volume?: string | undefined
      pub_date?: any | undefined
      authors: Array<{
        __typename?: "Author"
        last_name: string
        rank?: string | undefined
      }>
    }
  }>
}

const RenderPhenotypes = ({ strain }: { strain: RenderPhenotypesProps }) => {
  return (
    <>
      {strain.phenotypes?.map((phenotype, index) =>
        index === 0 ? (
          <PhenotypeRow
            id={strain.id}
            strain={strain.label}
            characteristics={strain.characteristics}
            phenotype={phenotype}
            in_stock={strain.in_stock}
            key={index}
          />
        ) : (
          <PhenotypeRow id={strain.id} phenotype={phenotype} key={index} />
        ),
      )}
    </>
  )
}

export default RenderPhenotypes
