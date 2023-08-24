import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Grid from "@material-ui/core/Grid"
import { object, string, InferType } from "yup"
import {
  PaymentMethod,
  renderPaymentAddressFields,
  PaymentInfoBox,
  ContinueButton,
} from "@dictybase/ui-dsc"
import { useSetAtom, useAtom } from "jotai"
import { BackButton } from "./BackButton"
import { paymentFormAtom, orderStepAtom } from "../state"

const validationSchema = object().shape({
  payerFirstName: string().required("* First name is required"),
  payerLastName: string().required("* Last name is required"),
  payerEmail: string().required("* Email is required"),
  payerOrganization: string().required("* Organization is required"),
  payerLab: string().required("* Lab/Group is required"),
  payerAddress1: string().required("* Address is required"),
  payerCity: string().required("* City is required"),
  payerZip: string()
    .required("* Zip code is required")
    .matches(/^\d+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  payerCountry: string().required("* Country is required"),
  payerPhone: string().required("* Phone number is required"),
  paymentMethod: string().oneOf(["purchaseOrder", "waiver", "credit", "wire"]),
  purchaseOrderNum: string().required("* Payment method is required"),
})
type PaymentFormData = InferType<typeof validationSchema>

/**
 * PaymentPage is the display component for when the user is entering
 * payment information.
 */
const PaymentPage = () => {
  const [paymentFormData, setPaymentFormData] = useAtom(paymentFormAtom)
  const setOrderStep = useSetAtom(orderStepAtom)
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: paymentFormData,
  })
  const { handleSubmit } = methods
  const onSubmit = (data: PaymentFormData) => {
    setPaymentFormData((previousFormData) => ({ ...previousFormData, ...data }))
    setOrderStep((previousStep) => previousStep + 1)
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {renderPaymentAddressFields()}
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <PaymentMethod />
              </Grid>
              <Grid item>
                <PaymentInfoBox />
              </Grid>
              <Grid item>
                <BackButton />
                <ContinueButton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export { PaymentPage }
