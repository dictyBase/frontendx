import { type ChangeEvent, type SetStateAction, type Dispatch } from "react"
import { useFormContext } from "react-hook-form"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"

enum PaymentMethods {
  PURCHASE_ORDER_NUMBER = "purchaseOrder",
  WAIVER_REQUESTED = "waiver",
  CREDIT = "credit",
  WIRE = "wire",
}

const radioValues: Array<{ value: PaymentMethods; label: string }> = [
  {
    value: PaymentMethods.PURCHASE_ORDER_NUMBER,
    label: "Purchase Order (PO)",
  },
  {
    value: PaymentMethods.CREDIT,
    label: "Credit Card",
  },
  {
    value: PaymentMethods.WIRE,
    label: "Wire Transfer",
  },
  {
    value: PaymentMethods.WAIVER_REQUESTED,
    label: "Waiver Requested",
  },
]

type PaymentMethodRadioGroupProperties = {
  /** Function to change the current payment method */
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethods>>
}

/**
 * PaymentMethodRadioGroup contains radio buttons for payment methods.
 */
const PaymentMethodRadioGroup = ({
  setPaymentMethod,
}: PaymentMethodRadioGroupProperties) => {
  const { register, getValues, setValue, resetField } = useFormContext()
  const onChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value === PaymentMethods.PURCHASE_ORDER_NUMBER) {
      resetField("purchaseOrderNum")
    } else {
      setValue("purchaseOrderNum", "N/A", { shouldDirty: true })
    }
    setPaymentMethod(value as PaymentMethods)
  }
  return (
    <RadioGroup
      aria-label="Payment Method"
      defaultValue={getValues("paymentMethod")}
      onChange={onChange}
      row>
      {radioValues.map((item) => (
        <FormControlLabel
          {...register("paymentMethod")}
          key={item.value}
          value={item.value}
          control={<Radio />}
          label={item.label}
        />
      ))}
    </RadioGroup>
  )
}

export { PaymentMethodRadioGroup }
