import { Box, Grid, Typography } from "@mui/material"
import InsertDriveFileIconOutlined from "@mui/icons-material/InsertDriveFileOutlined"
import { grey } from "@mui/material/colors"

type SelectedFileProperties = {
  filename: string
}

/* Used for displaying the name of the selected file in the `Upload` component. */
const SelectedFile = ({ filename }: SelectedFileProperties) => (
  <Grid item>
    <Box
      sx={{
        padding: 2,
        backgroundColor: grey[200],
        borderRadius: "0.3125rem",
      }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <InsertDriveFileIconOutlined />
        </Grid>
        <Grid item>
          <Typography>{filename}</Typography>
        </Grid>
      </Grid>
    </Box>
  </Grid>
)

export { SelectedFile }
