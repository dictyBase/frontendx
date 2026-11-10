import { Typography, Box, Grid } from "@mui/material"
import { footerStyles } from "../styles/footerStyles"

export const FooterSponsors = () => {
  const { classes } = footerStyles()

  return (
    <Grid
      item
      xs={12}
      container
      justifyContent="flex-end"
      sx={(t) => ({ color: t.palette.primary.contrastText })}
      className={classes.support}>
      <Box mt={1} mb={2} mr={1}>
        <em>
          Supported by{" "}
          <Typography
            component="a"
            sx={(t) => ({ color: t.palette.primary.contrastText })}
            href="https://reporter.nih.gov/project-details/10024726"
            target="_blank"
            rel="noopener noreferrer">
            NIH
          </Typography>
          /
          <Typography
            component="a"
            sx={(t) => ({ color: t.palette.primary.contrastText })}
            href="https://www.nigms.nih.gov/"
            target="_blank"
            rel="noopener noreferrer">
            NIGMS
          </Typography>
        </em>
      </Box>
    </Grid>
  )
}
