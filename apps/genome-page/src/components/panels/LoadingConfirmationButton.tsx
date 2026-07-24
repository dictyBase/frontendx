import { FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import IconButton from "@mui/material/IconButton"
import CircularProgress from "@mui/material/CircularProgress"
import CheckIcon from "@mui/icons-material/Check"

type LoadingConfirmationButtonProperties = {
  onClick: () => void
  loading: boolean
}

const LoadingConfirmationButton: FunctionComponent<
  LoadingConfirmationButtonProperties
> = ({ onClick, loading }) => (
  <IconButton
    onClick={onClick}
    disabled={loading}
    sx={{
      position: "absolute",
      right: 0,
      top: 0,
      height: 36,
      width: 36,
      color: "primary.main",
      "&:hover": {
        color: "primary.dark",
      },
    }}
    aria-label="Save new tag">
    {pipe(
      loading,
      Bmatch(
        () => <CheckIcon sx={{ fontSize: 20 }} />,
        () => <CircularProgress size={20} sx={{ color: "primary.main" }} />,
      ),
    )}
  </IconButton>
)

export { LoadingConfirmationButton }
