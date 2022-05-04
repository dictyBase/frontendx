import Typography from "@material-ui/core/Typography"
import Layout from "components/layout/Layout"
import { useRouter } from "next/router"
import ReactMarkDown from "react-markdown"
/**
 * Container component that issues a GraphQL query to get gene data for the
 * GO annotations page.
 */

interface WikiContainerProps {
  markdown?: string
}
const WikiContainer = ({ markdown }: WikiContainerProps) => {
  const { query } = useRouter()
  const geneId = query.gene as string

  return (
    <Layout
      gene={geneId}
      title={`Community Annotations for ${geneId}`}
      description={`Community Annotations for ${geneId}`}>
      <Typography component="div">
        {markdown ? (
          <ReactMarkDown>{markdown}</ReactMarkDown>
        ) : (
          `${geneId} doesn't have a community annotation. Be the first to contribute`
        )}
      </Typography>
    </Layout>
  )
}

export default WikiContainer
