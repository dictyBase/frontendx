import { FunctionComponent } from "react"
import { Container, Box, Grid, Typography } from "@mui/material"
import { NewsListActionBar } from "./NewsListActionBar"

const NewsListWrapperAuth: FunctionComponent = ({ children }) => (
  <Container
    sx={{
      marginTop: 2,
      marginBottom: 4,
      textAlign: "left",
      padding: "0px 6rem 1rem 6rem",
      borderRadius: "15px",
      boxSizing: "border-box",
      "@media (max-width: 768px)": {
        padding: "0 0 0 0",
      },
    }}>
    <Box
      sx={{
        background: (theme) =>
          `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        borderRadius: (theme) => theme.shape.borderRadius,
        boxShadow: (theme) => theme.shadows[3],
        padding: 3,
        marginBottom: 3,
        color: "#ffffff",
      }}>
      <Typography variant="h1" align="center" sx={{ marginBottom: 1 }}>
        Dicty Community Resource News
      </Typography>
      <Typography align="center" sx={{ fontStyle: "italic" }}>
        Latest updates from the Dictyostelium research community
      </Typography>
    </Box>
    <Grid container direction="row" spacing={2}>
      <Grid item xl={1} lg={1}>
        <NewsListActionBar />
      </Grid>
      <Grid item xl={11} lg={11}>
        {children}
      </Grid>
    </Grid>
  </Container>
)

export { NewsListWrapperAuth }
