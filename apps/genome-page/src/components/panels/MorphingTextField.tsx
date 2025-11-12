import { styled } from "@mui/material/styles"
import { match } from "ts-pattern"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import { jitterAnimation } from "styles/animations"

interface MorphingTextFieldProperties extends Omit<TextFieldProps, "size"> {
  hasError: boolean
}

const buttonColor = "primary.main"

const MorphingTextField = styled(TextField)<MorphingTextFieldProperties>(
  ({ hasError }) => ({
    "& .MuiOutlinedInput-root": {
      height: 36,
      borderRadius: 18,
      paddingRight: "40px",
      bgcolor: "background.paper",
      "& fieldset": {
        borderColor: "primary.light",
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor: buttonColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: buttonColor,
        borderWidth: 2,
      },
    },
    "& input": {
      paddingLeft: 2,
    },
    ...match(hasError)
      .with(true, () => jitterAnimation)
      .with(false, () => ({}))
      .exhaustive(),
  }),
)

export { MorphingTextField }
