import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Grid from "@material-ui/core/Grid"
import { object, string, number, InferType } from "yup"
import { renderAddressFields } from "../functional"
import { ContinueButton } from "./ContinueButton"
import { AdditionalInformation } from "./AdditionalInformation"
import { ShippingMethod } from "./ShippingMethod"

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

type ShippingPageProperties = {
  /** Function to set form data */
  setFormData: (data: ShippingFormData) => void
  /** Function to move to next step */
  nextStep: () => void
}

/**
 * ShippingPage is the display component for when the user is entering shipping
 * information.
 */

const ShippingPage = ({ setFormData, nextStep }: ShippingPageProperties) => {
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods

  const onSubmit = (data: ShippingFormData) => {
    setFormData(data)
    nextStep()
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {renderAddressFields(register, errors)}
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
