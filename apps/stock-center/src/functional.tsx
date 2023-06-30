import { CartTotalRowV2 } from "@dictybase/ui-dsc"

const renderStrainTotal = ({ strainItems }) => (
  <CartTotalRowV2 leftValue="Strains" items={strainItems} variant="body2" />
)

const renderPlasmidTotal = ({ plasmidItems }) => (
  <CartTotalRowV2 leftValue="Plasmids" items={plasmidItems} variant="body2" />
)

const renderStrainAndPlasmidTotals = ({ strainItems, plasmidItems }) => (
  <>
    <CartTotalRowV2 leftValue="Strains" items={strainItems} variant="body2" />
    <CartTotalRowV2 leftValue="Plasmids" items={plasmidItems} variant="body2" />
  </>
)

export { renderStrainTotal, renderPlasmidTotal, renderStrainAndPlasmidTotals }
