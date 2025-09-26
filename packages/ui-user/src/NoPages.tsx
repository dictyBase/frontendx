import { Typography, Paper } from "@mui/material"

const NoPages = () => (
  <Paper elevation={3} sx={{ padding: 3 }}>
    <Typography variant="h2" gutterBottom>
      No editable pages for you
    </Typography>
  </Paper>
)

export { NoPages }
