import { FunctionComponent } from "react"
import { Grid, Box, Theme, makeStyles } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { mapWithIndex as AmapWithIndex } from "fp-ts/Array"
import { match as Bmatch } from "fp-ts/boolean"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: "auto",
  },
  toolbar: {
    backgroundColor: "#fafafa",
    borderRadius: "2px",
    border: "1px solid #ddd",
    padding: theme.spacing(1),
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

const ActionBar: FunctionComponent<{
  descriptionElement?: JSX.Element
  children: Array<JSX.Element> | JSX.Element
}> = ({ descriptionElement, children }) => {
  const { toolbar, text } = useStyles()
  return (
    <Grid
      container
      justifyContent="space-between"
      className={toolbar}
      data-testid="info-page-toolbar">
      <Grid item>
        <Box component="span" className={text}>
          {descriptionElement}
        </Box>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          {pipe(
            children,
            Array.isArray,
            Bmatch(
              () => [<Grid item>{children}</Grid>],
              () =>
                pipe(
                  children as Array<JSX.Element>,
                  AmapWithIndex((index, child) => (
                    <Grid item key={index}>
                      {child}
                    </Grid>
                  )),
                ),
            ),
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export { ActionBar }
