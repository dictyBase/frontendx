import Typography from "@material-ui/core/Typography"
import PanelWrapper from "components/panels/PanelWrapper"
import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import {
  containerGenerator,
  createRouteFromString,
} from "../../../common/utils/containerGenerator"

interface SummaryContainerProps {
  gene: GeneQuery
}

const SummaryContainer = ({ gene }: SummaryContainerProps) => {
  const { query } = useRouter()
  const geneId = query.gene as string
  let displayList = containerGenerator(
    [
      "generalInformation",
      "gene",
      "listGeneProductInfo",
      "getAssociatedSequnces",
      "getLinks",
      "allPublications",
    ],
    gene,
  )

  return (
    <Layout
      gene={geneId}
      title={`Gene Summary for ${geneId}`}
      description={`Gene information for ${geneId}`}>
      <Typography component="div">
        {displayList.map((item, key) => (
          <PanelWrapper
            key={key}
            title={item.props.title}
            route={createRouteFromString(item.props.route, gene)}>
            {item.component}
          </PanelWrapper>
        ))}
      </Typography>
    </Layout>
  )
}

export default SummaryContainer
