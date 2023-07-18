import { match } from "ts-pattern"
import { useAtomValue } from "jotai"
import { OrderFormStepper } from "@dictybase/ui-dsc"
import { ShippingPage } from "../components/ShippingPage"
import { PaymentPage } from "../components/PaymentPage"
import { orderStepAtom, OrderSteps } from "../state"

const OrderForm = () => {
  const orderStep = useAtomValue(orderStepAtom)

  return (
    <>
      <OrderFormStepper step={orderStep} />
      {match(orderStep)
        .with(OrderSteps.SHIPPING, () => <ShippingPage />)
        .with(OrderSteps.PAYMENT, () => <PaymentPage />)
        .with(OrderSteps.SUBMIT, () => <>SubmitPage not implemented.</>)
        .otherwise(() => (
          <>Unexpected Error in Order Form. This message should not appear.</>
        ))}
    </>
  )
}

export default OrderForm
