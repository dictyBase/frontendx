import { match } from "ts-pattern"
import { useAtomValue } from "jotai"
import { Navigate } from "react-router-dom"
import { OrderFormStepper } from "@dictybase/ui-dsc"
import { ACCESS } from "@dictybase/auth-mui5"
import { ShippingPage } from "../../components/ShippingPage"
import { PaymentPage } from "../../components/PaymentPage"
import { SubmitPage } from "../../components/SubmitPage"
import { orderStepAtom, OrderSteps } from "../../orderState"
import { currentCartQuantityAtom } from "../../cartState"

const OrderForm = () => {
  const orderStep = useAtomValue(orderStepAtom)
  return (
    <>
      <OrderFormStepper step={orderStep} />
      {match(orderStep)
        .with(OrderSteps.SHIPPING, () => <ShippingPage />)
        .with(OrderSteps.PAYMENT, () => <PaymentPage />)
        .with(OrderSteps.SUBMIT, () => <SubmitPage />)
        .otherwise(() => (
          <>Unexpected Error in Order Form. This message should not appear.</>
        ))}
    </>
  )
}

const OrderFormWrapper = () => {
  const cartItemQuantity = useAtomValue(currentCartQuantityAtom)
  return match(cartItemQuantity)
    .with(0, () => <Navigate to="/cart" />)
    .otherwise(() => <OrderForm />)
}

// eslint-disable-next-line import/no-default-export
export default OrderFormWrapper
export const access = ACCESS.public
