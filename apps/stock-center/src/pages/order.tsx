import { match } from "ts-pattern"
import { useAtomValue } from "jotai"
import { ShippingPage } from "../components/ShippingPage"
import { orderStepAtom, OrderSteps } from "../state"

const OrderForm = () => {
  const orderStep = useAtomValue(orderStepAtom)

  return (
    <>
      {match(orderStep)
        .with(OrderSteps.SHIPPING, () => <ShippingPage />)
        .with(OrderSteps.PAYMENT, () => <>PaymentPage not implemented.</>)
        .with(OrderSteps.SUBMIT, () => <>SubmitPage not implemented.</>)
        .otherwise(() => (
          <>Unexpected Error in Order Form. This message should not appear.</>
        ))}
    </>
  )
}

export default OrderForm
