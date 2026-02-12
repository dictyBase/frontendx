import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import InsertDriveFileIconOutlined from "@mui/icons-material/InsertDriveFileOutlined"
import { grey } from "@mui/material/colors"

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: grey[200],
    borderRadius: "0.3125rem",
  },
}));

type SelectedFileProperties = {
  filename: string
}

/* Used for displaying the name of the selected file in the `Upload` component. */
const SelectedFile = ({ filename }: SelectedFileProperties) => {
  const { classes } = useStyles()
  return (
    <Grid item>
      <Box className={classes.root}>
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
}

export { SelectedFile }
