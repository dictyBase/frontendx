import Layout from "components/layout/Layout"
import { useRouter } from "next/router"
import ReactMarkDown from "react-markdown"
import { Paper, Container, Typography } from "@material-ui/core"
import useStyles from "../../../styles/dataTableStyles"
import WikiError from "./WikiError"
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
  const geneId = query.id as string

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
            <WikiError
              error={`${geneId} doesn't have a community annotation.`}
            />
          )}
        </Container>
      </Typography>
    </Layout>
  )
}

export default WikiContainer
