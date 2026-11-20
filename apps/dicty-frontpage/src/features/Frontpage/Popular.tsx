import { Box, Grid, Button } from "@mui/material"

const buttonStyle = {
  width: "100%",
  marginBottom: "5px",
  padding: "25px",
  fontSize: "16px",
  color: "#e5e5e5",
  textTransform: "none",
  backgroundColor: "#004080",
  "&:hover": {
    backgroundColor: "#cce6ff",
    color: "#333232",
  },
}

const altButtonStyle = {
  width: "100%",
  marginBottom: "5px",
  padding: "25px",
  fontSize: "16px",
  textTransform: "none",
  backgroundColor: "#80c1ff",
  color: "#333232",
  "&:hover": {
    backgroundColor: "#cce6ff",
  },
}

const listItemStyle = {
  listStyle: "none",
}

const linkStyle = {
  textDecoration: "none",
}

/** Widget that displays the most popular tools and sections */

const Popular = () => {
  const widgetlist = (
    <>
      <Box component="li" sx={listItemStyle}>
        <Box
          component="a"
          sx={linkStyle}
          href={`${import.meta.env.VITE_APP_STOCKCENTER_URL}`}>
          <Button
            sx={altButtonStyle}
            size="small"
            variant="contained"
            color="primary">
            Dicty Stock Center
          </Button>
        </Box>
      </Box>
      <Box component="li" sx={listItemStyle}>
        <Box
          component="a"
          sx={linkStyle}
          href="http://dictybase.org/tools/jbrowse/?data=data/jbrowse/discoideum&loc=6:1..50011&tracks=reference,gene,transcript">
          <Button
            sx={buttonStyle}
            size="small"
            variant="contained"
            color="primary">
            Genome Browser (coming soon)
          </Button>
        </Box>
      </Box>
      <Box component="li" sx={listItemStyle}>
        <Box component="a" sx={linkStyle} href="/gene/gflB">
          <Button
            sx={altButtonStyle}
            size="small"
            variant="contained"
            color="primary">
            Gene Page (in progress)
          </Button>
        </Box>
      </Box>
    </>
  )

  return (
    <Grid container justifyContent="center" sx={{ padding: "8px 16px" }}>
      <Grid item xs={12}>
        <Box
          sx={{
            color: "#bdbdbd",
            fontSize: "12px",
            verticalAlign: "top",
            textAlign: "left",
            fontStyle: "italic",
            "@media (max-width: 767px)": {
              fontSize: "14px",
              textAlign: "left",
            },
          }}>
          <Box sx={{ textAlign: "center" }}>New features and pages</Box>
        </Box>
        <Box component="ul" sx={{ padding: "0px", marginBottom: "5px" }}>
          {widgetlist}
        </Box>
      </Grid>
    </Grid>
  )
}

export { Popular }
