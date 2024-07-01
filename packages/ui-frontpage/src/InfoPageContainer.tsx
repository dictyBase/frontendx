import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import Container from "@material-ui/core/Container"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { Loader } from "./Loader"
import { GraphQLErrorPage } from "./GraphQLErrorPage"
import { pageTitleLookup } from "./utils/pageTitleConversions"
import { InfoPageViewToolbar } from "./InfoPageViewToolbar"
import { Fallback } from "./Fallback"
import { InfoPageView } from "./InfoPageView"

// getSlug will use the route's :subname or :name to fetch page content
// unless the route is for the privacy policy
const getSlug = (pathname: string, name?: string, subname?: string) => {
  if (pathname === "/privacy-policy" || pathname === "/privacy-policy/") {
    return "privacy-policy"
  }

  if (subname) return subname
  return name
}

/**
 * InfoPageContainer fetches the data for the desired editable page.
 */

const InfoPageContainer = () => {
  const { pathname } = useLocation()
  const { name, subname } = useParams()
  const navigate = useNavigate()
  const slug = getSlug(pathname, name, subname)

  const { loading, error, data } = useContentBySlugQuery({
    variables: {
      slug: `${slug}`,
    },
    fetchPolicy: "cache-and-network",
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate(`${pathname}/edit`, {
      state: {
        data,
      },
    })
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <GraphQLErrorPage error={error} />
  }

  if (slug === undefined || !data?.contentBySlug) {
    return <Fallback />
  }

  return (
    <>
      <Helmet>
        <title>{pageTitleLookup(slug)} - dictyBase</title>
      </Helmet>
      <Container maxWidth="lg">
        <InfoPageViewToolbar
          handleClick={handleClick}
          lastUpdate={data.contentBySlug.updated_at}
          user={data.contentBySlug.updated_by}
        />
        <InfoPageView data={data?.contentBySlug} />
      </Container>
    </>
  )
}

export { InfoPageContainer, getSlug }
