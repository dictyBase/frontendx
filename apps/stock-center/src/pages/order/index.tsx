import { match } from "ts-pattern"
import { useAtomValue } from "jotai"
import { OrderFormStepper } from "@dictybase/ui-dsc"
import { ShippingPage } from "../../components/ShippingPage"
import { PaymentPage } from "../../components/PaymentPage"
import { SubmitPage } from "../../components/SubmitPage"
import { orderStepAtom, OrderSteps } from "../../orderState"

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

// eslint-disable-next-line import/no-default-export
export default OrderForm
