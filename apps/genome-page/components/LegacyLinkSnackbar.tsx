import Grid from "@material-ui/core/Grid"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import { makeStyles } from "@material-ui/core/styles"
import InfoIcon from "@material-ui/icons/Info"
import LaunchIcon from "@material-ui/icons/Launch"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    marginBottom: "20px",
    paddingTop: 0,
    paddingBottom: 0,
    color: "rgba(0, 0, 0, 0.87)",
  },
  icon: {
    paddingRight: "5px",
  },
  message: {
    padding: 0,
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#4C5E81",
  },
  linkIcon: {
    verticalAlign: "middle",
  },
}))

type Props = {
  /** Gene used to link to legacy page */
  gene: string
}

/**
 * LegacyLinkSnackbar displays a link to the old gene page at the top of each page.
 */

const LegacyLinkSnackbar = ({ gene }: Props) => {
  const classes = useStyles()

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} lg={10} xl={8}>
        <SnackbarContent
          className={classes.root}
          classes={{ message: classes.message }}
          aria-describedby="legacy-link-snackbar"
          message={
            <span id="legacy-link-snackbar" className={classes.content}>
              <InfoIcon className={classes.icon} />
              <p>
                This gene page is a work in progress as we transition to our new
                database. We are continuously adding data to these pages, but in
                the meantime you can visit our{" "}
                <a
                  href={`http://dictybase.org/gene/${gene}`}
                  className={classes.link}
                  title={`Legacy gene page for ${gene}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  legacy page{" "}
                  <LaunchIcon fontSize="inherit" className={classes.linkIcon} />
                </a>{" "}
                for more detailed information about this gene.
              </p>
            </span>
          }
        />
      </Grid>
    </Grid>
  )
}

export default LegacyLinkSnackbar
