import { Paper } from "@mui/material"
import { LoadingDisplay } from "../LoadingDisplay"

const CatalogListLoader = () => (
  <Paper sx={{ height: "100%", p: 7 }}>
    <LoadingDisplay rows={12} height={40} />
  </Paper>
)

export { CatalogListLoader }
