import Typography from "@material-ui/core/Typography"
import Layout from "components/layout/Layout"
import PanelWrapper from "components/panels/PanelWrapper"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import {
  containerGenerator,
  createRouteFromString,
} from "../../../common/utils/containerGenerator"

interface ProteinInfoContainerProps {
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

/**
 * Container component that issues a GraphQL query to get gene data for the
 * Protein Information page.
 */
const ProteinInfoContainer = ({ gene }: ProteinInfoContainerProps) => {
  const { query } = useRouter()
  const geneId = query.id as string

  return (
    <Layout
      gene={geneId}
      title={`Protein Information for ${geneId}`}
      description={`Protein Information for ${geneId}`}>
      <Typography component="div">
        {(
          containerGenerator(
            ["general_info", "external_links", "protein_sequence"],
            gene,
          ) as ChildContent[]
        ).map((item, key) => {
          return (
            <PanelWrapper
              key={key}
              title={createRouteFromString(item!.panelProps.title, gene)}
              route={createRouteFromString(item!.panelProps.route, gene)}>
              {item!.child}
            </PanelWrapper>
          )
        })}
      </Typography>
    </Layout>
  )
}

export default ProteinInfoContainer
