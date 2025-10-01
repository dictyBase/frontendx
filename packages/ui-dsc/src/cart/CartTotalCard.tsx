import { Link } from "react-router-dom"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CartTotalRow } from "./CartTotalRow"
import { getCartTotal } from "../utils/getCartTotal"
import { type StrainCartItem } from "../types"

type ShoppingCartTotalCardProperties = {
  /** An array of cart items */
  items: Array<StrainCartItem>
}
/**
 * ShoppingCartTotalCard displays information about the cart total with a
 * link to checkout.
 */
const CartTotalCard = ({ items }: ShoppingCartTotalCardProperties) => {
  const strains = items.filter((item) => item.id.slice(0, 3) === "DBS")
  const plasmids = items.filter((item) => item.id.slice(0, 3) === "DBP")

  return (
    <Card
      sx={{
        minHeight: "170px",
        padding: 2,
      }}>
      {strains.length > 0 && (
        <CartTotalRow
          leftValue="Strains"
          numItems={strains.length}
          total={getCartTotal(strains)}
          variant="body2"
        />
      )}
      {plasmids.length > 0 && (
        <CartTotalRow
          leftValue="Plasmids"
          numItems={plasmids.length}
          total={getCartTotal(plasmids)}
          variant="body2"
        />
      )}
      <Divider sx={{ marginBottom: 2 }} />
      <CartTotalRow
        leftValue="Total"
        numItems={items.length}
        total={getCartTotal(items)}
        variant="h3"
      />
      <CardActions>
        <Button
          component={Link}
          to="/order/checkout"
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
          startIcon={<FontAwesomeIcon icon="shopping-cart" />}
          sx={{
            fontWeight: 1000,
            minHeight: "50px",
            "&:hover": {
              color: "#fff",
            },
          }}>
          Proceed to Checkout
        </Button>
      </CardActions>
    </Card>
  )
}

export { CartTotalCard }
