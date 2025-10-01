import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import { OrderSummaryListItems } from "./OrderSummaryListItems"
import { getShippingValues, getPaymentValues } from "../utils/getListValues"
import { type FormData } from "../utils/initialFormValues"
import { getCartTotal } from "../utils/getCartTotal"
import { Cart } from "../types"


type OrderSummaryProperties = {
  /** Object containing all entered form data */
  formData: FormData
  /** Object containing the cart items data */
  cart: Cart
}

/**
 * OrderSummary is the display component for the final page (Review your order)
 * before the user submits their order.
 */
const OrderSummary = ({ formData, cart }: OrderSummaryProperties) => {
  return (
    <>
      <Typography
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
          padding: theme.spacing(1),
        })}
        variant="h2"
        gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        <OrderSummaryListItems cart={cart} />
        <ListItem sx={(theme) => ({ padding: theme.spacing(1, 0) })}>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
            }
          />
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {getCartTotal([...cart.strainItems, ...cart.plasmidItems])}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Grid container spacing={2} sx={(theme) => ({ marginBottom: theme.spacing(3) })}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h2"
            gutterBottom
            sx={(theme) => ({
              marginTop: theme.spacing(2),
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.getContrastText(theme.palette.primary.main),
              padding: theme.spacing(1),
            })}>
            Shipping Address
          </Typography>
          {getShippingValues(formData).map((item) => (
            <Typography key={item}>{item}</Typography>
          ))}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography
            variant="h2"
            gutterBottom
            sx={(theme) => ({
              marginTop: theme.spacing(2),
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.getContrastText(theme.palette.primary.main),
              padding: theme.spacing(1),
            })}>
            Payment Details
          </Typography>
          {getPaymentValues(formData).map((item) => (
            <Typography key={item}>{item}</Typography>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export { OrderSummary }
