import { FunctionComponent } from "react"
import { Container, Box, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    textAlign: "left",
    padding: "0px 6rem 1rem 6rem",
    borderRadius: "15px",
    boxSizing: "border-box",
    "@media (max-width: 768px)": {
      padding: "0 0 0 0",
    },
  },
  headerContainer: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: "#ffffff",
  },
  heading: {
    marginBottom: theme.spacing(1),
  },
  subheading: {
    fontStyle: "italic",
  },
}))

const NewsListWrapper: FunctionComponent = ({ children }) => {
  const { container, headerContainer, heading, subheading } = useStyles()
  return (
    <Container className={container}>
      <Box className={headerContainer}>
        <Typography variant="h1" align="center" className={heading}>
          Dicty Community Resource News
        </Typography>
        <Typography align="center" className={subheading}>
          Latest updates from the Dictyostelium research community
        </Typography>
      </Box>
      {children}
    </Container>
  )
}

export { NewsListWrapper }
