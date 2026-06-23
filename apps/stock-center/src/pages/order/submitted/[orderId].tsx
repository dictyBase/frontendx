import { Navigate, useParams } from "react-router-dom"
import { Container, Grid, Box } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { grey } from "@material-ui/core/colors"
import {
  OrderHeader,
  OrderDescription,
  OrderSummaryPdf,
  BackToHomePage,
} from "@dictybase/ui-dsc"
import { useAtomValue } from "jotai"
import { orderAtom } from "../../../orderState"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: grey[200],
    margin: theme.spacing(2, 0, 2, 0),
    minHeight: "320px",
  },
}))
/**
 * Displays notification that the user's order was submitted successfully.
 */
const OrderConfirmation = () => {
  const classes = useStyles()
  const order = useAtomValue(orderAtom)
  const { orderId } = useParams()
  if (order.orderID !== orderId) return <Navigate to="/" />

  return (
    <Container>
      <Grid container alignItems="center" className={classes.container}>
        <Grid item xs={12}>
          <Box margin={2}>
            <OrderHeader orderID={order.orderID} />
            <OrderDescription />
            <OrderSummaryPdf order={order} />
          </Box>
        </Grid>
        <BackToHomePage />
      </Grid>
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default OrderConfirmation
