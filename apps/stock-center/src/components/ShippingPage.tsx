import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Grid from "@material-ui/core/Grid"
import { object, string, number, InferType } from "yup"
import {
  renderShippingAddressFields,
  ContinueButton,
  AdditionalInformation,
  ShippingMethod,
} from "@dictybase/ui-dsc"
import { useSetAtom } from "jotai"
import { shippingFormAtom, orderStepAtom } from "../state"

const validationSchema = object().shape({
  firstName: string().required("* First name is required"),
  lastName: string().required("* Last name is required"),
  email: string().email().required("* Email is required"),
  organization: string().required("* Organization is required"),
  lab: string().required("* Lab/Group is required"),
  address1: string().required("* Address is required"),
  city: string().required("* City is required"),
  zip: number().required("* Zip code is required"),
  country: string().required("* Country is required"),
  phone: string().required("* Phone number is required"),
  shippingAccountNumber: string().required(
    "* Shipping account number is required",
  ),
  additionalInformation: string().notRequired(),
})

type ShippingFormData = InferType<typeof validationSchema>

/**
 * ShippingPage is the display component for when the user is entering shipping
 * information.
 */
const ShippingPage = () => {
  const setOrderFormData = useSetAtom(shippingFormAtom)
  const setOrderStep = useSetAtom(orderStepAtom)
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  })

  const { handleSubmit } = methods
  console.log(methods.getValues())
  const onSubmit = (data: ShippingFormData) => {
    setOrderFormData((previousFormData) => ({ ...previousFormData, ...data }))
    setOrderStep((previousStep) => previousStep + 1)
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {renderShippingAddressFields()}
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <ShippingMethod />
              </Grid>
              <Grid item>
                <AdditionalInformation />
              </Grid>
              <Grid item>
                <ContinueButton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export { ShippingPage }
