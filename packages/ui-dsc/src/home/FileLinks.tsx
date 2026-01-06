import Grid from "@mui/material/Grid"
import { downloadLinks } from "../linkLists"
import { HomepageColumn } from "./HomepageColumn"

const FileLinks = () => (
  <Grid container item xs={4} direction="column">
    <HomepageColumn title="Downloads" entries={downloadLinks} />
  </Grid>
)

export { FileLinks }
