import { useFormContext, Controller } from "react-hook-form"
import MuiTextField, {
  TextFieldProps as MuiTextFieldProperties,
} from "@material-ui/core/TextField"

type TextFieldProperties = {
  /** name for MUI TextField */
  name: string
  /** label for MUI TextField */
  label: string
  /** Margin for MUI TextField */
  margin?: string
  /** Variant for MUI TextField */
  variant?: string
  /** fullWidth for MUI TextField */
  fullWidth?: boolean
} & MuiTextFieldProperties

/**
 * TextField is a wrapper component that puts all react-hook-form and MUI props
 * on the Material-UI TextField component.
 */
const TextField = ({
  name,
  label,
  margin = "dense",
  variant = "outlined",
  fullWidth = true,
}: TextFieldProperties) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MuiTextField
          id={label}
          label={label}
          type="text"
          margin={margin}
          variant={variant}
          fullWidth={fullWidth}
          {...field}
          error={!!errors[name]}
          helperText={errors[name]?.message || ""}
        />
      )}
    />
  )
}

export { TextField }
