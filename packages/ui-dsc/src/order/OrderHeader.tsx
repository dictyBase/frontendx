import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  confirmation: {
    fontSize: "1.2em",
  },
}))

const OrderHeader = ({ orderID }: { orderID: string }) => {
  const classes = useStyles()
  return (
    <Box mt={3} mb={3}>
      <Typography gutterBottom component="p" className={classes.confirmation}>
        <strong>Order ID: {orderID}</strong>
      </Typography>
    </Box>
  )
}

export { OrderHeader }
