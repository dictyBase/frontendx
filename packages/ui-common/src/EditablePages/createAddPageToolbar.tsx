import { Grid, Box, Typography, makeStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: "auto",
  },
  toolbar: {
    backgroundColor: "#fafafa",
    borderRadius: "2px",
    border: "1px solid #ddd",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "100%",
    alignItems: "center",
  },
  label: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    fontSize: "0.8rem",
    fontWeight: "bold",
    lineHeight: 1,
    color: "#fff",
    whiteSpace: "nowrap",
    borderRadius: "0.25em",
    backgroundColor: theme.palette.primary.light,
  },
  icon: {
    color: theme.palette.primary.light,
    fontSize: "1rem",
    marginRight: theme.spacing(0.5),
  },
  text: {
    color: theme.palette.primary.light,
  },
}))

type ToolbarProperties = {
  children: Array<JSX.Element>
}

const createAddPageToolbar =
  (path: string) =>
  // eslint-disable-next-line react/function-component-definition
  ({ children }: ToolbarProperties) => {
    const { toolbar, text } = useStyles()
    return (
      <Grid
        container
        justifyContent="space-between"
        className={toolbar}
        data-testid="info-page-toolbar">
        <Grid item>
          <Box component="span" className={text}>
            <Typography>{`Add Editable Page for Route: ${path}`}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            {children.map((child, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid key={index} item>
                {child}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }

export { createAddPageToolbar }
