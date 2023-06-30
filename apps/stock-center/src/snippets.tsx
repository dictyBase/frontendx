import Card from "@material-ui/core/Card"
import { CartTotalRowV2 } from "@dictybase/ui-dsc"
import { type Cart } from "./cartState"

type TotalRowSnippetProperties = {
  cart: Cart
}

const TotalRowSnippet = ({ cart }: TotalRowSnippetProperties) => (
  <Card>
    {cart.strainItems ? (
      <CartTotalRowV2
        variant="body2"
        leftValue="Strains"
        items={cart.strainItems}
      />
    ) : (
      <></>
    )}
    {cart.plasmidItems ? (
      <CartTotalRowV2
        variant="body2"
        leftValue="Plasmids"
        items={cart.plasmidItems}
      />
    ) : (
      <></>
    )}
    {cart.totalItems ? (
      <CartTotalRowV2
        variant="body2"
        leftValue="Total"
        items={cart.totalItems}
      />
    ) : (
      <></>
    )}
  </Card>
)

export { TotalRowSnippet }
