import { Link } from "react-router-dom"
import { makeStyles } from "tss-react/mui"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CartTotalRow } from "./CartTotalRow"
import { getCartTotal } from "../utils/getCartTotal"
import { type StrainCartItem } from "../types"

const useStyles = makeStyles()((theme) => ({
  container: {
    minHeight: "170px",
    padding: theme.spacing(2),
  },
  checkoutBtn: {
    fontWeight: 1000,
    minHeight: "50px",
    "&:hover": {
      color: "#fff",
    },
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}))

type ShoppingCartTotalCardProperties = {
  /** An array of cart items */
  items: Array<StrainCartItem>
}
/**
 * ShoppingCartTotalCard displays information about the cart total with a
 * link to checkout.
 */
const CartTotalCard = ({ items }: ShoppingCartTotalCardProperties) => {
  const { classes } = useStyles()
  const strains = items.filter((item) => item.id.slice(0, 3) === "DBS")
  const plasmids = items.filter((item) => item.id.slice(0, 3) === "DBP")

  return (
    <Card className={classes.container}>
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
      <Divider className={classes.divider} />
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
          className={classes.checkoutBtn}>
          Proceed to Checkout
        </Button>
      </CardActions>
    </Card>
  )
}

export { CartTotalCard }
