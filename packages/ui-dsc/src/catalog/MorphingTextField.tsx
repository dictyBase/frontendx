import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"

const jitterAnimation = {
  animation: "jitter 0.3s ease-in-out",
  "@keyframes jitter": {
    "0%, 100%": { transform: "translateX(0)" },
    "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
    "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
  },
}

/**
 * Rounded text field with error jitter animation used inside morphing add/create buttons.
 */
const MorphingTextField = styled(TextField)(({ theme, error }) => {
  const borderColor = pipe(
    Boolean(error),
    Bmatch(
      () => theme.palette.primary.main,
      () => theme.palette.error.main,
    ),
  )
  const initialBorderColor = pipe(
    Boolean(error),
    Bmatch(
      () => theme.palette.primary.light,
      () => theme.palette.error.main,
    ),
  )
  const animationStyles = pipe(
    Boolean(error),
    Bmatch(
      () => ({}),
      () => jitterAnimation,
    ),
  )
  return {
    ...animationStyles,
    "& .MuiOutlinedInput-root": {
      height: 36,
      borderRadius: 18,
      paddingRight: "40px",
      backgroundColor: theme.palette.background.paper,
      "& fieldset": {
        borderColor: initialBorderColor,
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor,
      },
      "&.Mui-focused fieldset": {
        borderColor,
        borderWidth: 2,
      },
    },
    "& input": {
      paddingLeft: theme.spacing(2),
    },
  }
})

export { MorphingTextField }
