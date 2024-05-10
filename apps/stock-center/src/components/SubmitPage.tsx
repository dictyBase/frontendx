import Box from "@material-ui/core/Box"
import { useAtomValue } from "jotai"
import { OrderSummary } from "@dictybase/ui-dsc"
import { BackButton } from "./BackButton"
import { SubmitButton } from "./SubmitButton"
import { cartAtom } from "../cartState"
import { shippingFormAtom, paymentFormAtom } from "../orderState"

/**
 * SubmitPage is the final page the user sees before submitting the order.
 */
const SubmitPage = () => {
  const shippingFormData = useAtomValue(shippingFormAtom)
  const paymentFormData = useAtomValue(paymentFormAtom)
  const cartItems = useAtomValue(cartAtom)

  return (
    <Box mt={1} mb={2} p={2}>
      <OrderSummary
        formData={{ ...shippingFormData, ...paymentFormData }}
        cart={cartItems}
      />
      <Box display="flex" justifyContent="flex-end">
        <BackButton />
        <SubmitButton />
      </Box>
    </Box>
  )
}

export { SubmitPage }
