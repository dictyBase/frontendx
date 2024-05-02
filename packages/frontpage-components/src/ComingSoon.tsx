import { Grid, Typography, makeStyles, Theme } from "@material-ui/core"

type ComingSoonProperties = {
  text: string
  height: string
}

const useComingSoonStyles = makeStyles<Theme, { height: string }, "root">({
  root: {
    height: ({ height }) => height,
    backgroundColor: "#9eb5cb",
    color: "#0d2235",
    borderRadius: "10px",
    fontStyle: "italic",
  },
})

const ComingSoon = ({ text, height }: ComingSoonProperties) => {
  const { root } = useComingSoonStyles({ height })
  return (
    <Grid
      container
      className={root}
      alignItems="center"
      justifyContent="center">
      <Grid item>
        <Typography variant="h2">{text}</Typography>
      </Grid>
    </Grid>
  )
}

export { ComingSoon }
