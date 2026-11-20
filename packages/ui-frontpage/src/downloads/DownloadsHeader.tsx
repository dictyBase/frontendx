import { Box, Typography } from "@mui/material"

const DownloadsHeader = () => (
  <Box sx={{ textAlign: "center" }}>
    <Typography sx={{ marginTop: "20px", marginBottom: "20px" }} variant="h1">
      dictyBase Downloads
    </Typography>
    <Typography sx={{ marginBottom: "20px" }} variant="h3">
      The central collection of downloadable material from dictyBase
    </Typography>
  </Box>
)

export { DownloadsHeader }
