import useStyles from "styles/querySection"
import { Box, Card, Typography, Grid } from "@material-ui/core"

const QuerySection = () => {
  const classes = useStyles()

  return (
    <Grid item xs={5} md={5}>
      <Box className={classes.titleBox}>
        <Typography className={classes.titleBoxText}>Query Sequence</Typography>
      </Box>
      <Card variant="outlined" className={classes.card}>
        <Typography className={classes.boldText}>
          Enter query sequence in FASTA format
        </Typography>
        <textarea
          rows={10}
          placeholder="Type or paste a query or sequence here..."
          className={classes.textArea}
        />
      </Card>
    </Grid>
  )
}

export default QuerySection
