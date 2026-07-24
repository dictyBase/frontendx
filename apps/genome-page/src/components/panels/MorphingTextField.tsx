import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import { jitterAnimation } from "../../styles/animations"

const MorphingTextField = styled(TextField)(({ theme, error }) => ({
  ...(error ? jitterAnimation : {}),
  "& .MuiOutlinedInput-root": {
    height: 36,
    borderRadius: 18,
    paddingRight: "40px",
    backgroundColor: theme.palette.background.paper,
    "& fieldset": {
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.primary.light,
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  "& input": {
    paddingLeft: theme.spacing(2),
  },
}))

export { MorphingTextField }
