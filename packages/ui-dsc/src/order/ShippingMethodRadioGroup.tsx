import { useFormContext } from "react-hook-form"
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const couriers = ["DHL", "FedEx", "UPS"]

type ShippingMethodRadioGroupProperties = {
  /** Function to set shipping method */
  setIsPrepaid: (argument0: boolean) => void
}

/**
 * ShippingMethodRadioGroup contains the radio buttons for listing courier
 * information.
 */
const ShippingMethodRadioGroup = ({
  setIsPrepaid,
}: ShippingMethodRadioGroupProperties) => {
  const { register, resetField, setValue, getValues } = useFormContext()

  const handleShipAccountChange = () => {
    setIsPrepaid(false)
    resetField("shippingAccountNumber")
  }

  const handlePrepaidLabelChange = () => {
    setIsPrepaid(true)
    setValue("shippingAccountNumber", "sending prepaid shipping label")
  }

  return (
    <RadioGroup
      aria-label="Shipping Account"
      defaultValue={getValues("shippingAccount")}
      name="shippingAccount"
      row>
      {couriers.map((item: string) => (
        <FormControlLabel
          {...register("shippingAccount")}
          key={item}
          value={item}
          control={<Radio />}
          label={item}
          onChange={handleShipAccountChange}
        />
      ))}
      <FormControlLabel
        {...register("shippingAccount")}
        value="prepaid"
        control={<Radio />}
        label="Send prepaid shipping label"
        onChange={handlePrepaidLabelChange}
      />
    </RadioGroup>
  )
}

export { ShippingMethodRadioGroup }
