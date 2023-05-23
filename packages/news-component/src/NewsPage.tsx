import { useContentBySlugQuery } from "dicty-graphql-schema"
import { useParams } from "react-router-dom"
import DisplayNews from "./DisplayNews"

const NewsPage = () => {
  const { slug } = useParams()
  const { loading, error, data } = useContentBySlugQuery({
    variables: {
      slug: `${slug}`,
    },
  })
  if (error) return <div> Error </div>
  if (loading) return <div> Loading </div>
  if (!data?.contentBySlug) return <div> Fallback </div>

  return <DisplayNews content={data.contentBySlug} />
}

export default NewsPage
