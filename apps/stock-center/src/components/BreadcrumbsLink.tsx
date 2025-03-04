import Link from "@material-ui/core/Link"
import { Link as RouterLink } from "react-router-dom"
import { capitalizeFirstCharacter } from "@dictybase/ui-dsc"

type BreadcrumbsLinkProperties = {
  /** Pathname from URL (i.e. information) */
  name: string
  path: string
}

/**
 * BreadcrumbsLink handles the display of any breadcrumbs that are not the
 * final list item.
 */

const BreadcrumbsLink = ({ name, path }: BreadcrumbsLinkProperties) => (
  <Link
    color="inherit"
    component={RouterLink}
    to={path}
    data-testid="breadcrumbs-link">
    {capitalizeFirstCharacter(name)}
  </Link>
)

export { BreadcrumbsLink }
