import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import CardActions from "@material-ui/core/CardActions"
import Divider from "@material-ui/core/Divider"
import { ShoppingCartTotalRowV2, ContinueShoppingCard } from "@dictybase/ui-dsc"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ShoppingCartItem } from "./ShoppingCartItem"
import { type StrainItems } from "../types"
import { isFull } from "../utils/isFull"

const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: "0px",
  },
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

type ShoppingCartListProperties = {
  /** An array of cart items */
  items: StrainItems
  /** A callback that will be run when the user clicks a delete button on a ShoppingCartItem */
  deleteItem: () => void
}

/**
 * ShoppingCartPageWithItems is the display for the cart page when there are
 * items in the cart.
 */
const ShoppingCartList = ({
  items,
  deleteItem,
}: ShoppingCartListProperties) => {
  const classes = useStyles()

  const strains = items.filter((item) => item.id.slice(0, 3) === "DBS")

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <List className={classes.list}>
          {items.map((item) => (
            <ShoppingCartItem item={item} deleteItem={deleteItem} />
          ))}
        </List>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.container}>
          {strains.length > 0 ? (
            <ShoppingCartTotalRowV2
              leftValue="Strains"
              items={strains}
              variant="body2"
            />
          ) : (
            <></>
          )}
          {/* {plasmid.length > 0 ? (
            <ShoppingCartTotalRowV2
              leftValue="Plasmids"
              items={plasmids}
              variant="body2"
            />
          ) : (
            <></>
          )} */}
          <Divider className={classes.divider} />
          <ShoppingCartTotalRowV2
            leftValue="Total"
            items={items}
            variant="h3"
          />
          <CardActions>
            {/* separate to checkout button */}
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
        {!isFull(items) && <ContinueShoppingCard />}
      </Grid>
    </Grid>
  )
}

export { ShoppingCartList }
