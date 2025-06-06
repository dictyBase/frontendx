import { Typography, Paper, Grid, makeStyles } from "@material-ui/core"
import { teal } from "@material-ui/core/colors"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { parseISO, format } from "date-fns/fp"
import { truncateString } from "../utils/truncateString"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    "&:hover": { boxShadow: theme.shadows[7] }
  },
  dateContainer: {
    background: `linear-gradient(to left, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    borderTopLeftRadius: theme.spacing(1),
    borderTopRightRadius: theme.spacing(1),
    color: theme.palette.getContrastText(teal[600]),
    padding: theme.spacing(1.5),
  },
  dateText: {
    fontWeight: 600,
  },
  bodyContainer: {
    padding: "1rem",
  },
}))

type NewsItemProperties = {
  name: string
  content: string
  createdAt: string
}

const NewsItemAuth = ({ name, content, createdAt }: NewsItemProperties) => {
  const classes = useStyles()
  return (
    <Link to={`../news/${name}/editable`}>
      <Paper elevation={4} className={classes.root}>
        <Grid container direction="column">
          <Grid item className={classes.dateContainer}>
            <Typography variant="h3" variantMapping={{ h3: "h2"}} className={classes.dateText}>
              {pipe(createdAt, parseISO, format("PPPP"))}
            </Typography>
          </Grid>
          <Grid item className={classes.bodyContainer}>
            <Typography>{truncateString(content, 400)}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  )
}

export { NewsItemAuth }
