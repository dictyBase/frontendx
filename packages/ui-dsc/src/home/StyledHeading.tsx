import { styled } from "@mui/styles"
import Grid from "@mui/material/Grid"

const StyledHeading = styled(Grid)({
  paddingBottom: "0px !important",
  "& h1": {
    fontSize: "48px",
    marginTop: "0px",
    marginBottom: "25px",
    borderBottom: "1px solid #eee",
  },
})

export { StyledHeading }
