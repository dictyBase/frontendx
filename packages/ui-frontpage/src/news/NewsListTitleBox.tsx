import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const NewsListTitleBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  borderRadius: "4px",
  boxShadow: theme.shadows[3],
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: "#ffffff",
}))

export { NewsListTitleBox }
