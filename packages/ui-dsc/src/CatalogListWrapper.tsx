import { makeStyles } from "@material-ui/core/styles"
import { DefaultTheme } from "@material-ui/styles"
import Paper from "@material-ui/core/Paper"
import { RefObject } from "react"
import { useWindowSize } from "@dictybase/hook"

type HeightProperties = {
  height: number
}

const useStyles = makeStyles<DefaultTheme, HeightProperties>({
  root: {
    height: ({ height }) => height,
    overflowY: "scroll",
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
 * The height of this component is dynamically adjusted to 60% of
 * the browser's window height
 */
export const CatalogListWrapper = ({
  root: rootReference,
  children,
}: CatalogListWrapperProperties): JSX.Element => {
  const { height } = useWindowSize()
  // 60% of actual client window height
  const { root } = useStyles({ height: height && (60 * height) / 100 })
  return (
    <Paper ref={rootReference} className={root as string}>
      {children}
    </Paper>
  )
}
