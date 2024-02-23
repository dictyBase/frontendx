import { Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

type EmptyPublicationsProperties = {
  range: string
}

const useEmptyPublicationStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: theme.palette.grey[400],
    height: "400px",
    marginTop: "30px",
    marginBottom: "50px",
    borderRadius: "10px",
    backgroundColor: theme.palette.grey[400],
  },
  item: {
    textAlign: "center",
    // padding: "100px 100px 100px 100px",
  },
}))

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
