import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const OrderHeader = ({ orderID }: { orderID: string }) => {
  return (
    <Box mt={3} mb={3}>
      <Typography gutterBottom component="p" sx={{ fontSize: "1.2em" }}>
        <strong>Order ID: {orderID}</strong>
      </Typography>
    </Box>
  )
}

export { OrderHeader }
