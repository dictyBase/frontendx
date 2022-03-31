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

interface ChildContent {
  panelProps: {
    id: string
    title: string
    route: string
  }
  child: JSX.Element | undefined
}

const SummaryContainer = ({ gene }: SummaryContainerProps) => {
  const { query } = useRouter()
  const geneId = query.gene as string

  return (
    <Layout
      gene={geneId}
      title={`Gene Summary for ${geneId}`}
      description={`Gene information for ${geneId}`}>
      <Typography component="div">
        {(
          containerGenerator(
            [
              "generalInformation",
              "gene",
              "listGeneProductInfo",
              "getAssociatedSequnces",
              "getLinks",
              "allPublications",
            ],
            gene,
          ) as ChildContent[]
        ).map((item, key) => {
          return (
            <PanelWrapper
              key={key}
              title={item!.panelProps.title}
              route={createRouteFromString(item!.panelProps.route, gene)}>
              {item!.child}
            </PanelWrapper>
          )
        })}
      </Typography>
    </Layout>
  )
}

export default SummaryContainer
