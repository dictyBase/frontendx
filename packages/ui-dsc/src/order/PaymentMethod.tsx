import { match } from "ts-pattern"
import { useState } from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { PanelWrapper } from "./PanelWrapper"
import { TextField } from "./TextField"
import { WaiverRequestInformation } from "./WaiverRequestInformation"

enum PaymentMethods {
  PURCHASE_ORDER_NUMBER,
  WAIVER_REQUESTED,
  CREDIT,
  WIRE,
}

const renderPaymentMethod = (paymentMethod: PaymentMethods) =>
  match(paymentMethod)
    .with(PaymentMethods.PURCHASE_ORDER_NUMBER, () => (
      <TextField
        name="purchaseOrderNum"
        label="Purchase Order Number"
        placeholder="PO Number"
      />
    ))
    .with(PaymentMethods.WAIVER_REQUESTED, () => <WaiverRequestInformation />)
    .otherwise(() => <></>)

/**
 * ShippingMethod contains radio buttons and a text field for listing courier
 * information.
 */
const ShippingMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState(
    PaymentMethods.PURCHASE_ORDER_NUMBER,
  )

  return (
    <PanelWrapper title="Payment Method">
      <Box mt={1} mb={2} p={2}>
        <Typography variant="h3">Shipping Account:</Typography>
        <Box mt={1} />
        {renderPaymentMethod(paymentMethod)}
        <Box mt={1} />
        <Typography component="p">
          <em>Note: credit card is not allowed for shipment</em>
        </Typography>
      </Box>
    </PanelWrapper>
  )
}

export { ShippingMethod }
