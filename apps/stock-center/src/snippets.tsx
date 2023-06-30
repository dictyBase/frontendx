import Card from "@material-ui/core/Card"
import { CartTotalRowV2 } from "@dictybase/ui-dsc"
import { type Cart } from "./cartState"
import {
  renderStrainTotal,
  renderPlasmidTotal,
  renderStrainAndPlasmidTotals,
  renderCartTotal,
} from "@dictybase/ui-dsc/src/functional"

type TotalRowSnippetProperties = {
  cart: Cart
}

const TotalRowSnippet = ({ cart }: TotalRowSnippetProperties) => (
  <Card>
    {cart.strainItems ? renderStrainTotal(cart) : <></>}
    {cart.plasmidItems ? renderPlasmidTotal(cart) : <></>}
    {cart.totalItems ? renderCartTotal(cart) : <></>}
  </Card>
)

export { TotalRowSnippet }
