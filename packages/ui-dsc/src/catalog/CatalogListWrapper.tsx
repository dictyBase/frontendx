import Paper from "@mui/material/Paper"
import makeStyles from '@mui/styles/makeStyles';
import { RefObject } from "react"

const useStyles = makeStyles({
  root: {
    overflowY: "scroll",
    height: "100%",
  },
})
/**
 * The prop for {@link CatalogListWrapper}
 */
export interface CatalogListWrapperProperties {
  /** The dom element/reference which this component is going to refer */
  root: RefObject<HTMLDivElement>
  /** List of react component */
  children: JSX.Element | JSX.Element[] | null
}

/**
 * Wraps the given react components with a material-ui's
 * {@link https://v4.mui.com/components/paper/| Paper component}.
 */
export const CatalogListWrapper = ({
  root: rootReference,
  children,
}: CatalogListWrapperProperties): JSX.Element => {
  const classes = useStyles()
  return (
    <Paper
      data-testid="catalog-list-wrapper-root"
      ref={rootReference}
      className={classes.root}>
      {children}
    </Paper>
  )
}
