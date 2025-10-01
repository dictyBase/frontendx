import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.secondary.main),
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}))

export { SecondaryButton }
