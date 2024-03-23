import {
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { Cart } from "../types"

import { getCatalogItemPathAndDescriptor } from "../utils/getCatalogItemPathAndDescriptor"

type OrderSummaryListItemsProperties = {
  cart: Cart
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
}))

const OrderSummaryListItems = ({ cart }: OrderSummaryListItemsProperties) => {
  const { listItem } = useStyles()
  return (
    <>
      {pipe(
        [...cart.strainItems, ...cart.plasmidItems],
        Amap((item) => {
          const { itemDescriptor } = getCatalogItemPathAndDescriptor(item)
          return (
            <ListItem className={listItem} key={item.id}>
              <ListItemText
                primary={itemDescriptor}
                secondary={
                  <>
                    <Typography noWrap>
                      <em>{item.summary}</em>
                    </Typography>
                    <Typography>{item.id}</Typography>
                  </>
                }
              />
              <Typography variant="body1">${Number(item.fee)}.00</Typography>
            </ListItem>
          )
        }),
      )}
    </>
  )
}

export { OrderSummaryListItems }
