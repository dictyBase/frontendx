import { useContentBySlugQuery } from "dicty-graphql-schema"
import { useParams } from "react-router-dom"
// import { getURLPathSegments } from "./utils"

const useInitialContentData = () => {
  const { slug } = useParams()
  const { data } = useContentBySlugQuery({
    variables: {
      slug: `${slug}`,
    },
  })
  return data?.contentBySlug
}

export { useInitialContentData }
