import { match } from "ts-pattern"
import { ShippingPage } from "@dictybase/ui-dsc"
import { useAtom } from "jotai"
import { orderStepAtom, OrderSteps } from "../state"

const OrderForm = () => {
  const [orderStep, setOrderStep] = useAtom(orderStepAtom)

  return (
    <>
      {match(orderStep)
        .with(OrderSteps.SHIPPING, () => (
          <ShippingPage
            setFormData={() => {}}
            nextStep={() => setOrderStep((previousStep) => previousStep + 1)}
          />
        ))
        .with(OrderSteps.PAYMENT, () => <>PaymentPage not implemented.</>)
        .with(OrderSteps.SUBMIT, () => <>SubmitPage not implemented.</>)
        .otherwise(() => (
          <>Unexpected Error in Order Form. This message should not appear.</>
        ))}
    </>
  )
}

export default OrderForm
