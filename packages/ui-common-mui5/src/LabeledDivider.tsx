import { Grid, Typography, Divider, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  labelText: {
    color: theme.palette.secondary.dark,
  },
  divider: {
    backgroundColor: theme.palette.secondary.dark,
    opacity: 0.3,
    height: "2px",
  },
}))

const LabeledDivider = ({ label }: { label: string }) => {
  const { root, labelText, divider } = useStyles()
  return (
    <Grid container spacing={2} alignItems="center" className={root}>
      <Grid item>
        <Typography
          variant="h2"
          variantMapping={{ h2: "subtitle1" }}
          className={labelText}>
          {label}
        </Typography>
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <Divider className={divider} />
      </Grid>
    </Grid>
  )
}

export { LabeledDivider }
