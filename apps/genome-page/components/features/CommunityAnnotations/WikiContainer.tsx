import Layout from "components/layout/Layout"
import { useRouter } from "next/router"
import ReactMarkDown from "react-markdown"
import { Paper, Container, Typography } from "@material-ui/core"
import useStyles from "../../../styles/dataTableStyles"
/**
 * Container component that issues a GraphQL query to get gene data for the
 * GO annotations page.
 */

interface WikiContainerProps {
  markdown?: string
}
const WikiContainer = ({ markdown }: WikiContainerProps) => {
  const classes = useStyles()

  const { query } = useRouter()
  const geneId = query.gene as string

  return (
    <Layout
      gene={geneId}
      title={`Community Annotations for ${geneId}`}
      description={`Community Annotations for ${geneId}`}>
      <Typography component="div">
        {" "}
        <Container component={Paper} className={classes.root} maxWidth={false}>
          {markdown ? (
            <ReactMarkDown>{markdown}</ReactMarkDown>
          ) : (
            `${geneId} doesn't have a community annotation. Be the first to contribute`
          )}
        </Container>
      </Typography>
    </Layout>
  )
}

export default WikiContainer
