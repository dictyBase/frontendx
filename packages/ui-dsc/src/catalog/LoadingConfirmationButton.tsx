import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import IconButton from "@mui/material/IconButton"
import CircularProgress from "@mui/material/CircularProgress"
import CheckIcon from "@mui/icons-material/Check"

type LoadingConfirmationButtonProperties = {
  /** Click handler invoked to confirm the new item */
  onClick: () => void
  /** Whether the save operation is currently in progress */
  loading: boolean
}

/**
 * Icon button that displays a checkmark when idle and a spinner while loading.
 *
 * @param properties - Click handler and loading state.
 * @returns The rendered IconButton component.
 */
const LoadingConfirmationButton = ({
  onClick,
  loading,
}: LoadingConfirmationButtonProperties) => (
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

export { LoadingConfirmationButton, type LoadingConfirmationButtonProperties }
