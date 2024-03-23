import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { grey } from "@material-ui/core/colors"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Avatar from "@material-ui/core/Avatar"
import ListItem from "@material-ui/core/ListItem"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import ClearIcon from "@material-ui/icons/Clear"
import type { CatalogCartItem } from "../types"
import { getCatalogItemPathAndDescriptor } from "../utils/getCatalogItemPathAndDescriptor"
import { toCurrencyString } from "../utils/toCurrencyString"

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.palette.primary.light,
  },
  container: {
    minHeight: "170px",
    borderRadius: "0px",
    border: `1px solid ${grey[200]}`,
  },
  fee: {
    color: theme.palette.error.main,
    fontSize: "1.5rem",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

type ShoppingCartItemProperties = {
  /** Individual cart item with given quantity */
  item: CatalogCartItem
  /** A callback that will be run when the user clicks a delete button on a ShoppingCartItem */
  deleteItem: () => void
}

/**
 * ShoppingCartItem is an individual item displayed in ShoppingCartList.
 */
const CartItem = ({ item, deleteItem }: ShoppingCartItemProperties) => {
  const classes = useStyles()
  const { itemPath, itemDescriptor } = getCatalogItemPathAndDescriptor(item)
  return (
    <Card className={classes.container}>
      <CardHeader
        avatar={
          <Avatar aria-label="stock" className={classes.avatar}>
            {itemPath === "strains" ? "S" : "P"}
          </Avatar>
        }
        action={
          <IconButton aria-label="Remove Item" onClick={deleteItem}>
            <ClearIcon />
          </IconButton>
        }
        title={
          <Typography variant="h2">
            <Link to={`/${itemPath}/${item.id}`}>{itemDescriptor}</Link>
          </Typography>
        }
        disableTypography
      />
      <ListItem>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <Typography noWrap>
              <em>{item.summary}</em>
            </Typography>
            <Typography noWrap>{item.id}</Typography>
            <Typography
              variant="h3"
              noWrap
              className={classes.fee}
              data-testid="fee">
              {toCurrencyString(item.fee)}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    </Card>
  )
}

export { CartItem }
