import { Link, useLocation, useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BackToHomePage } from "./BackToHomePage"
import sadDicty from "./assets/sad-dicty.png"

const paragraphStyle = {
  padding: "10px",
}

type Properties = {
  /** Error message to display */
  error?: string
}

type Parameters_ = {
  /** Name param in URL */
  name: string
  /** Subname param in URL */
  subname: string
}

/**
 * UI display when an item was not found.
 */

// While not currently used in the component, sometimes NotFoundError is invoked by other components that provide it an error prop, so the parameter will not be removed for now.
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotFoundError = ({ error }: Properties) => {
  const { name, subname } = useParams<Parameters_>()
  const location = useLocation()

  return (
    <Grid container sx={{ marginTop: "40px" }} justifyContent="center">
      <Grid item xs={10} md={8}>
        <Box
          sx={{
            backgroundColor: "#eff8fb",
            textAlign: "center",
            paddingTop: "30px",
            paddingBottom: "30px",
            marginBottom: "30px",
            borderRadius: "5px",
          }}>
          <img src={sadDicty} alt="Sad Dicty -- Page Not Found" />
          <h3>Page Not Found</h3>
          <Box component="p" sx={paragraphStyle}>
            Sorry! We can&apos;t find that page.
          </Box>
          <Box component="p" sx={paragraphStyle}>
            You can try one of the links in our navbar above, or head back to
            the homepage.
          </Box>
          <BackToHomePage />
          <div>
            <br />
            <Box
              component={Link}
              sx={{ color: "#428bca", textDecoration: "none" }}
              to="/addpage"
              state={{
                name,
                subname,
                url: location.pathname,
              }}>
              <Button
                sx={{
                  width: "25%",
                  marginTop: "25px",
                  padding: "25px",
                  textTransform: "none",
                  backgroundColor: "secondary.main",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                }}
                size="small"
                variant="contained"
                color="primary">
                <FontAwesomeIcon icon="plus" />
                &nbsp; Add a page to this route
              </Button>
            </Box>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}

export { NotFoundError }
