import { Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useEmptyPublicationStyles = makeStyles((theme) => ({
  container: {
    height: "400px",
    marginTop: "30px",
    marginBottom: "50px",
    borderRadius: "10px",
    backgroundColor: theme.palette.grey[400],
  },
  item: {
    textAlign: "center",
  },
}))

type EmptyPublicationsProperties = {
  /* A description of the time frame specified by the user */
  range: string
}
/**
 * display a message when there are no publications available for a given range.
 * It renders a container with a fixed height and a grey background color. Inside the
 * container, it displays a centered message with the range for which there are no publications.
 */
const EmptyPublications = ({ range }: EmptyPublicationsProperties) => {
  const { container, item } = useEmptyPublicationStyles()
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={container}>
      <Grid item className={item}>
        <Typography variant="h2">
          <em>No Publications for this range:</em>
        </Typography>
        <Typography variant="subtitle1">
          <em>{range}</em>
        </Typography>
      </Grid>
    </Grid>
  )
}

export { EmptyPublications }
