import { match } from "ts-pattern"
import { useState } from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { useFormContext } from "react-hook-form"
import { ShippingMethodPrepaidNotice } from "./ShippingMethodPrepaidNotice"
import { ShippingMethodRadioGroup } from "./ShippingMethodRadioGroup"
import { PanelWrapper } from "./PanelWrapper"
import { TextField } from "./TextField"

const renderShippingNumberOrPrepaidNotice = (isPrepaid: boolean) =>
  match(isPrepaid)
    .with(true, () => <ShippingMethodPrepaidNotice />)
    .with(false, () => (
      <TextField name="shippingAccountNumber" label="Shipping Account Number" />
    ))
    .exhaustive()
/**
 * ShippingMethod contains radio buttons and a text field for listing courier
 * information.
 */
const ShippingMethod = () => {
  const { getValues } = useFormContext()
  const [isPrepaid, setIsPrepaid] = useState(
    getValues("shippingAccount") === "prepaid",
  )
  return (
    <PanelWrapper title="Shipping Method">
      <Box mt={1} mb={2} p={2}>
        <Typography variant="h3">Shipping Account:</Typography>
        <Box mt={1} />
        <ShippingMethodRadioGroup setIsPrepaid={setIsPrepaid} />
        {renderShippingNumberOrPrepaidNotice(isPrepaid)}
        <Box mt={1} />
        <Typography component="p">
          <em>Note: credit card is not allowed for shipment</em>
        </Typography>
      </Box>
    </PanelWrapper>
  )
}

export { ShippingMethod }
