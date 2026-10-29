import { pipe } from "fp-ts/function"
import { Option, map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { findFirst as AfindFirst } from "fp-ts/Array"
import {
  StrainType,
  PlasmidType,
  usePlasmidListFilterQuery,
  useStrainListQuery,
} from "dicty-graphql-schema"
import {
  buildPlasmidListFilter,
  graphqlListVariables,
  plasmidGroupFilterOptions,
  buildStrainListFilter,
  strainGroupFilterOptions,
} from "@dictybase/hook-dsc"

// pipe(
//   strainGroupFilterOptions,
//   AfindFirst(({ value }) => value === v),
//   Omap(({ graphqlFilter }) => graphqlFilter),
// ),
const useInitialSearchResults = ({
  entity,
  group,
  skip,
}: {
  entity: string
  group: Option<string>
  skip: boolean
}) => {
  const someGroup = pipe(
    group,
    OgetOrElse(() => "all"),
  )
  console.log({ skip })
  const {
    loading: loadingS,
    error: errorS,
    data: dataS,
  } = useStrainListQuery({
    variables: {
      ...graphqlListVariables,
      filter: {
        strain_type: pipe(
          strainGroupFilterOptions,
          AfindFirst(({ value }) => value === someGroup),
          Omap(({ graphqlFilter }) => graphqlFilter.strain_type),
          OgetOrElse(() => StrainType.All as StrainType),
        ),
      },
    },
    skip,
  })
  console.log(dataS)
  // const {
  //   loading: loadingPlasmids,
  //   error: errorPlasmids,
  //   data: dataPlasmids,
  //   fetchMore: fetchMorePlasmids,
  //   refetch: Plasmids,
  // } = usePlasmidListFilterQuery({
  //   variables: {
  //     ...graphqlListVariables,
  //     filter: buildPlasmidListFilter(searchParameters),
  //   },
  // })
  return { loading: loadingS, error: errorS, data: dataS }
}

export { useInitialSearchResults }
