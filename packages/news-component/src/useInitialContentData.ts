import { useContentBySlugQuery } from "dicty-graphql-schema"
import { useParams } from "react-router-dom"
// import { getURLPathSegments } from "./utils"

const useInitialContentData = () => {
  let initialTitle = ""
  let initialId = ""
  // eslint-disable-next-line unicorn/no-null
  let initialContent = null
  let initialSlug = ""
  const { slug } = useParams()
  const { data } = useContentBySlugQuery({
    variables: {
      slug: `${slug}`,
    },
  })

  if (data) {
    initialSlug = slug || ""
    initialId = data.contentBySlug?.id || ""
    initialTitle = data.contentBySlug?.name || ""
    // eslint-disable-next-line unicorn/no-null
    initialContent = data.contentBySlug?.content || null
  }

  return { initialId, initialTitle, initialSlug, initialContent }
}
export default useInitialContentData
