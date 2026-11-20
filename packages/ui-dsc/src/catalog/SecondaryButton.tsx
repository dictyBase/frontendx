import { Theme } from "@mui/material/styles"
import Button, { type ButtonProps } from "@mui/material/Button"

const SecondaryButton = (properties: ButtonProps) => (
  <Button
    {...properties}
    sx={(theme: Theme) => ({
      color: theme.palette.primary.contrastText,
      "&:hover": {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.action.hover,
      },
    })}
  />
)

export { SecondaryButton }
