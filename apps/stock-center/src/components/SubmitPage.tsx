import Box from "@material-ui/core/Box"
import { useAtomValue } from "jotai"
import { OrderSummary } from "@dictybase/ui-dsc"
import { BackButton } from "./BackButton"
// import SubmitButton from "./SubmitButton"
import { shippingFormAtom, paymentFormAtom, cartAtom } from "../state"

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
        {/* <SubmitButton
          formData={{ ...shippingFormAtom, ...paymentFormAtom }}
          setSubmitError={setSubmitError}
        /> */}
      </Box>
    </Box>
  )
}

export { SubmitPage }
