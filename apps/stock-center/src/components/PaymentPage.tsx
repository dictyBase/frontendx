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
import { pipe, flow } from "fp-ts/function"
import {
  toArray,
  deleteAt,
  fromEntries as RfromEntries,
  toEntries as RtoEntries,
} from "fp-ts/Record"
import { mapFst } from "fp-ts/Tuple"
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
import { commonOrderFields } from "../orderValidation"

const appendPayerToKeys = flow(
  RtoEntries<string, any>,
  Amap(mapFst(convertToPayerField)),
  RfromEntries,
)

const validationSchema = object().shape({
  ...appendPayerToKeys(commonOrderFields),
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
    RfromEntries,
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
