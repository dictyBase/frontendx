import { makeStyles } from "@material-ui/core/styles"
import { DefaultTheme } from "@material-ui/styles"
import Paper from "@material-ui/core/Paper"
import { RefObject } from "react"
import { useWindowSize, SizeProps } from "@dictybase/hook"

const useStyles = makeStyles<DefaultTheme, SizeProps>({
  root: {
    height: ({ height }) => height,
    overflowY: "scroll",
  },
})

/**
 * The prop for {@link CatalogListWrapper}
 */
export interface CatalogListWrapperProps {
  /** The dom element/reference which this component is going to refer*/
  root: RefObject<HTMLDivElement>
  /** List of react component*/
  children: JSX.Element | JSX.Element[] | null
}

/**
 * Wraps the given react components with a material-ui's
 * {@link https://v4.mui.com/components/paper/| Paper component}.
 * The height of this component is dynamically adjusted to 60% of
 * the browser's window height
 */
export function CatalogListWrapper({
  root: rootRef,
  children,
}: CatalogListWrapperProps): JSX.Element {
  const { height } = useWindowSize()
  // 50% of actual client window height
  const classes = useStyles({ height: height && (60 * height) / 100 })
  return (
    <Paper ref={rootRef} className={classes.root}>
      {children}
    </Paper>
  )
}
