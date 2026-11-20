import Paper from "@mui/material/Paper"
import { RefObject, type ReactElement } from "react"

/**
 * The prop for {@link CatalogListWrapper}
 */
export interface CatalogListWrapperProperties {
  /** The dom element/reference which this component is going to refer */
  root: RefObject<HTMLDivElement | null>
  /** List of react component */
  children: ReactElement | ReactElement[] | null
}

/**
 * Wraps the given react components with a material-ui's
 * {@link https://v4.mui.com/components/paper/| Paper component}.
 */
export const CatalogListWrapper = ({
  root: rootReference,
  children,
}: CatalogListWrapperProperties): ReactElement => (
  <Paper
    data-testid="catalog-list-wrapper-root"
    ref={rootReference}
    sx={{ overflowY: "scroll", height: "100%" }}>
    {children}
  </Paper>
)
