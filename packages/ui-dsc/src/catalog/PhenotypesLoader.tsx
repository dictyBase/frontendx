import { useStrainQuery, Strain } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { ExistingPhenotypeList } from "./ExistingPhenotypesList"

type PhenotypesLoaderProperties = {
  strainId: Strain["id"]
}

const PhenotypesLoader = ({ strainId }: PhenotypesLoaderProperties) => {
  const result = useStrainQuery({ variables: { id: strainId } })
  return match(result)
    .with({ loading: true }, () => <> loading </>)
    .with({ error: P.not(undefined) }, () => <> error </>)
    .with(
      {
        data: {
          strain: { phenotypes: P.select(P.array({ phenotype: P.string })) },
        },
      },
      (phenotypes) => <ExistingPhenotypeList phenotypes={phenotypes} />,
    )
    .otherwise(() => <> This message should not appear </>)
}

export { PhenotypesLoader }
