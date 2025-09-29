import { Grid, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

type ComingSoonProperties = {
  text: string
}

const StyledGrid = styled(Grid)({
  height: "100%",
  padding: "4rem 4rem 4rem 4rem",
  backgroundColor: "#9eb5cb",
  color: "#0d2235",
  borderRadius: "10px",
  fontStyle: "italic",
})

const ComingSoon = ({ text }: ComingSoonProperties) => (
  <StyledGrid container alignItems="center" justifyContent="center">
    <Grid item>
      <Typography variant="h2">{text}</Typography>
    </Grid>
  </StyledGrid>
)

export { ComingSoon }
