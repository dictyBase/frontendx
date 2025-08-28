import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Grid from "@material-ui/core/Grid"
import { object, string, InferType } from "yup"
import {
  renderShippingAddressFields,
  ContinueButton,
  AdditionalInformation,
  ShippingMethod,
} from "@dictybase/ui-dsc"
import { useSetAtom, useAtom } from "jotai"
import { shippingFormAtom, orderStepAtom } from "../orderState"
import { commonOrderFields } from "../orderValidation"

const validationSchema = object().shape({
  ...commonOrderFields,
  shippingAccount: string().required("* Shipping account is required"),
  shippingAccountNumber: string().required(
    "* Shipping account number is required",
  ),
  additionalInformation: string().max(
    500,
    "May contain 500 characters at most",
  ),
})

type ShippingFormData = InferType<typeof validationSchema>

/**
 * ShippingPage is the display component for when the user is entering shipping
 * information.
 */
const ShippingPage = () => {
  const [shippingFormData, setShippingFormData] = useAtom(shippingFormAtom)
  const setOrderStep = useSetAtom(orderStepAtom)
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    values: shippingFormData,
  })

  const { handleSubmit } = methods
  const onSubmit = (data: ShippingFormData) => {
    setShippingFormData((previousFormData) => ({
      ...previousFormData,
      ...data,
    }))
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
