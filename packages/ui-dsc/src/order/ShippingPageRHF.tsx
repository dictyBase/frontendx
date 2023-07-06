/* eslint-disable unicorn/filename-case */
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Grid from "@material-ui/core/Grid"
import { object, string, number, InferType } from "yup"
import { LeftColumn } from "./LeftColumn"
// import ShippingPageRightColumn from "./ShippingPageRightColumn"

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
  const { handleSubmit } = useForm({ resolver: yupResolver(validationSchema) })

  const onSubmit = (data: ShippingFormData) => {
    setFormData(data)
    nextStep()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LeftColumn />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={2}>
            {/* <ShippingPageRightColumn /> */}
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export { ShippingPage }
