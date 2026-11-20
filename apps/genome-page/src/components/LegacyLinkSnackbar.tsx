import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import SnackbarContent from "@mui/material/SnackbarContent"
import InfoIcon from "@mui/icons-material/Info"
import LaunchIcon from "@mui/icons-material/Launch"

type Properties = {
  /** Gene used to link to legacy page */
  gene: string
}

/**
 * LegacyLinkSnackbar displays a link to the old gene page at the top of each page.
 */

const LegacyLinkSnackbar = ({ gene }: Properties) => (
  <Grid container justifyContent="center">
    <Grid item xs={10} lg={10} xl={8}>
      <SnackbarContent
        sx={{
          backgroundColor: "#f5f5f5",
          marginBottom: "20px",
          paddingTop: 0,
          paddingBottom: 0,
          color: "rgba(0, 0, 0, 0.87)",
          "& .MuiSnackbarContent-message": {
            padding: 0,
          },
        }}
        aria-describedby="legacy-link-snackbar"
        message={
          <Box
            component="span"
            id="legacy-link-snackbar"
            sx={{ display: "flex", alignItems: "center" }}>
            <InfoIcon sx={{ paddingRight: "5px" }} />
            <p>
              This gene page is a work in progress as we transition to our new
              database. We are continuously adding data to these pages, but in
              the meantime you can visit our{" "}
              <Box
                component="a"
                href={`http://dictybase.org/gene/${gene}`}
                sx={{ textDecoration: "none", color: "#4C5E81" }}
                title={`Legacy gene page for ${gene}`}
                target="_blank"
                rel="noopener noreferrer">
                legacy page{" "}
                <LaunchIcon
                  fontSize="inherit"
                  sx={{ verticalAlign: "middle" }}
                />
              </Box>{" "}
              for more detailed information about this gene.
            </p>
          </Box>
        }
      />
    </Grid>
  </Grid>
)

export { LegacyLinkSnackbar }
