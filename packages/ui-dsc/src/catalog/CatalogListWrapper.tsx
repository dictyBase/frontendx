import Paper from "@material-ui/core/Paper"
import { RefObject } from "react"

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
}: CatalogListWrapperProperties): JSX.Element => (
  <Paper ref={rootReference}>{children}</Paper>
)
