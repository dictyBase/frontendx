import Typography from "@material-ui/core/Typography"
import Layout from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import PanelWrapper from "components/panels/PanelWrapper"
import ProteinLinks from "./ProteinLinks"
import ProteinSequence from "./ProteinSequence"
import ProteinGeneralInfo from "./ProteinGeneralInfo"

interface ProteinInfoContainerProps {
  gene: GeneQuery
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
        <PanelWrapper title={"General Information"}>
          <ProteinGeneralInfo gene={gene} />
        </PanelWrapper>
        <PanelWrapper title={"Links"}>
          <ProteinLinks gene={gene} />
        </PanelWrapper>
        <PanelWrapper title={"Protein Sequence"}>
          <ProteinSequence gene={gene} />
        </PanelWrapper>
      </Typography>
    </Layout>
  )
}

export default ProteinInfoContainer
