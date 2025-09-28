import { FunctionComponent } from "react"
import { Container, Box, Typography } from "@mui/material"

const NewsListWrapper: FunctionComponent = ({ children }) => (
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
        borderRadius: "8px",
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
    {children}
  </Container>
)

export { NewsListWrapper }
