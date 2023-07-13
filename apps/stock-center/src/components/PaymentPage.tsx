import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Grid from "@material-ui/core/Grid"
import { object, string, number, InferType } from "yup"
import { renderAddressFields } from "@dictybase/ui-dsc"
import { useSetAtom } from "jotai"
import { paymentFormAtom, orderStepAtom } from "../state"

const validationSchema = object().shape({
  payerFirstName: string().required("* First name is required"),
  payerLastName: string().required("* Last name is required"),
  payerEmail: string().required("* Email is required"),
  payerOrganization: string().required("* Organization is required"),
  payerLab: string().required("* Lab/Group is required"),
  payerAddress1: string().required("* Address is required"),
  payerCity: string().required("* City is required"),
  payerZip: number().required("* Zip code is required"),
  payerCountry: string().required("* Country is required"),
  payerPhone: string().required("* Phone number is required"),
  purchaseOrderNum: string().required("* Payment method is required"),
})
type PaymentFormData = InferType<typeof validationSchema>

/**
 * PaymentPage is the display component for when the user is entering
 * payment information.
 */
const PaymentPage = () => {
  const setPaymentFormData = useSetAtom(paymentFormAtom)
  const setOrderStep = useSetAtom(orderStepAtom)
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
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
            {renderAddressFields()}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Grid container direction="column" spacing={2}>
              <Grid item>
                <ShippingMethod />
              </Grid>
              <Grid item>
                <AdditionalInformation />
              </Grid>
              <Grid item>
                <ContinueButton />
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export { PaymentPage as ShippingPage }
