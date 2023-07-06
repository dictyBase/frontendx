import { CartTotalRow } from "./cart/CartTotalRow"
import { type Cart } from "./types"
import { getCartTotal } from "./utils/getCartTotal"

const renderStrainTotal = ({ strainItems }: Cart) => (
  <CartTotalRow
    leftValue="Strains"
    numItems={strainItems.length}
    total={getCartTotal(strainItems)}
    variant="body2"
  />
)

const renderPlasmidTotal = ({ plasmidItems }: Cart) => (
  <CartTotalRow
    leftValue="Plasmids"
    numItems={plasmidItems.length}
    total={getCartTotal(plasmidItems)}
    variant="body2"
  />
)

const renderStrainAndPlasmidTotals = ({ strainItems, plasmidItems }: Cart) => (
  <>
    <CartTotalRow
      leftValue="Strains"
      numItems={strainItems.length}
      total={getCartTotal(strainItems)}
      variant="body2"
    />
    <CartTotalRow
      leftValue="Plasmids"
      numItems={plasmidItems.length}
      total={getCartTotal(plasmidItems)}
      variant="body2"
    />
  </>
)

const renderCartTotal = ({ strainItems = [], plasmidItems = [] }: Cart) => {
  const cumulative = [...strainItems, plasmidItems]
  return (
    <CartTotalRow
      leftValue="Total"
      numItems={cumulative.length}
      total={getCartTotal(cumulative)}
      variant="body2"
    />
  )
}

export {
  renderStrainTotal,
  renderPlasmidTotal,
  renderStrainAndPlasmidTotals,
  renderCartTotal,
}
