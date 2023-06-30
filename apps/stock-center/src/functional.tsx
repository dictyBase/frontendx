import { CartTotalRowV2 } from "@dictybase/ui-dsc"
import { type Cart } from "./cartState"

const renderStrainTotal = ({ strainItems }: Cart) => (
  <CartTotalRowV2 leftValue="Strains" items={strainItems} variant="body2" />
)

const renderPlasmidTotal = ({ plasmidItems }: Cart) => (
  <CartTotalRowV2 leftValue="Plasmids" items={plasmidItems} variant="body2" />
)

const renderStrainAndPlasmidTotals = ({ strainItems, plasmidItems }: Cart) => (
  <>
    <CartTotalRowV2 leftValue="Strains" items={strainItems} variant="body2" />
    <CartTotalRowV2 leftValue="Plasmids" items={plasmidItems} variant="body2" />
  </>
)

export { renderStrainTotal, renderPlasmidTotal, renderStrainAndPlasmidTotals }
