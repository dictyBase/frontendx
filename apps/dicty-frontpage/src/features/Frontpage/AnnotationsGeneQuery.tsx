import React from "react"
import { useListRecentGenesQuery } from "dicty-graphql-schema"
import GraphQLErrorPage from "../../common/components/errors/GraphQLErrorPage"
import Loader from "../../common/components/Loader"
import AnnotationsItem from "./AnnotationsItem"

const AnnotationsGeneQuery = () => {
  const { data, loading, error } = useListRecentGenesQuery({
    variables: {
      limit: 4,
    },
  })

  return (
    <>
      {loading ? <Loader /> : undefined}
      {error ? <GraphQLErrorPage error={error} /> : undefined}
      {data ? <AnnotationsItem data={data} type="genes" /> : undefined}
    </>
  )
}

export default AnnotationsGeneQuery
