import useStyles from "../../../../styles/blastContainerStyles"
import {
  Typography,
  Card,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core"

const BlastButtonsRow = () => {
  const classes = useStyles()
  return (
    <>
      {/* Blast Program */}
      <Box className={classes.contentBox}>
        <Card variant="outlined" className={classes.card}>
          <div className={classes.row}>
            <Button size="small" variant="contained">
              BLAST
            </Button>
            <Button size="small" variant="contained">
              Reset
            </Button>
            <Button size="small" variant="contained">
              BLAST at NCBI
            </Button>
          </div>
        </Card>
      </Box>
    </>
  )
}

export default BlastButtonsRow
