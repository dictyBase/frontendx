import { useState, type ChangeEvent } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Grid from "@material-ui/core/Grid"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { object, string, InferType } from "yup"
import {
  PaymentMethod,
  renderPaymentAddressFields,
  PaymentInfoBox,
  ContinueButton,
  convertToPayerField,
} from "@dictybase/ui-dsc"
import { pipe } from "fp-ts/function"
import { toArray, deleteAt, fromEntries } from "fp-ts/Record"
import { map as Amap } from "fp-ts/Array"
import { useAtom, useSetAtom, useAtomValue } from "jotai"
import { BackButton } from "./BackButton"
import {
  initialPaymentValues,
  paymentFormAtom,
  orderStepAtom,
  shippingFormAtom,
} from "../orderState"
import { type ShippingFormData } from "../types"

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
  paymentMethod: string()
    .required()
    .oneOf(["purchaseOrder", "waiver", "credit", "wire"]),
  purchaseOrderNum: string().required("* Payment method is required"),
})
type PaymentFormData = InferType<typeof validationSchema>

const getFilledPaymentFormData = (shippingFormData: ShippingFormData) => {
  const paymentAddress = pipe(
    shippingFormData,
    deleteAt("shippingAccount"),
    deleteAt("shippingAccountNumber"),
    deleteAt("additionalInformation"),
    toArray,
    Amap(([k, v]): [keyof Partial<ShippingFormData>, string] => [
      convertToPayerField(k) as keyof ShippingFormData,
      v,
    ]),
    fromEntries,
  )
  return { ...initialPaymentValues, ...paymentAddress }
}

/**
 * PaymentPage is the display component for when the user is entering
 * payment information.
 */
const PaymentPage = () => {
  const [useShippingAddress, setUseShippingAddress] = useState(false)
  const [paymentFormData, setPaymentFormData] = useAtom(paymentFormAtom)
  const shippingFormData = useAtomValue(shippingFormAtom)
  const setOrderStep = useSetAtom(orderStepAtom)
  const paymentAddressValues = useShippingAddress
    ? getFilledPaymentFormData(shippingFormData)
    : paymentFormData

  console.log(shippingFormData, paymentAddressValues)
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    values: paymentAddressValues,
    resolver: yupResolver(validationSchema),
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
  })
  const { handleSubmit } = methods

  const onSubmit = (data: PaymentFormData) => {
    setPaymentFormData((previousFormData) => ({ ...previousFormData, ...data }))
    setOrderStep((previousStep) => previousStep + 1)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUseShippingAddress(event.target.checked)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControlLabel
          label="Use shipping address"
          control={
            <Checkbox onChange={onChange} checked={useShippingAddress} />
          }
        />
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
