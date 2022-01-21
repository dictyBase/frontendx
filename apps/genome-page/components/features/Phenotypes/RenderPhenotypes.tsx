import PhenotypeRow from "./PhenotypeRow"

interface RenderPhenotypesProps {
  strain: {
    __typename?: "Strain"
    id: string
    label: string
    characteristics?: Array<string> | null | undefined
    in_stock: boolean
    phenotypes?:
      | Array<{
          __typename?: "Phenotype"
          phenotype: string
          publication?:
            | {
                __typename?: "Publication"
                id: string
                title: string
                journal: string
                pages?: string | null | undefined
                volume?: string | null | undefined
                pub_date?: any | null | undefined
                authors: Array<{
                  __typename?: "Author"
                  last_name: string
                  rank?: string | null | undefined
                }>
              }
            | null
            | undefined
        }>
      | null
      | undefined
  }
}

const RenderPhenotypes = ({ strain }: RenderPhenotypesProps) => {
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
