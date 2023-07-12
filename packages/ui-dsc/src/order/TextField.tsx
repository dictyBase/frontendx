import { useFormContext } from "react-hook-form"
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
 * TextField is a wrapper component that puts all Formik and MUI props
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
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <MuiTextField
      label={label}
      type="text"
      margin={margin}
      variant={variant}
      fullWidth={fullWidth}
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message || ""}
    />
  )
}

export { TextField }
