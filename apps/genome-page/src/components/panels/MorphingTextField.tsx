import { styled } from "@mui/material/styles"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import { jitterAnimation } from "../../styles/animations"

interface MorphingTextFieldProperties extends Omit<TextFieldProps, "size"> {
  hasError?: boolean
}

const MorphingTextField = styled(TextField)<MorphingTextFieldProperties>(
  ({ theme, hasError }) => ({
    ...(hasError ? jitterAnimation : {}),
    "& .MuiOutlinedInput-root": {
      height: 36,
      borderRadius: 18,
      paddingRight: "40px",
      backgroundColor: theme.palette.background.paper,
      "& fieldset": {
        borderColor: theme.palette.primary.light,
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
    "& input": {
      paddingLeft: theme.spacing(2),
    },
  }),
)

export { MorphingTextField }
