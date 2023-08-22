import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import { Link as RouterLink } from "react-router-dom"
import { capitalizeFirstCharacter } from "@dictybase/ui-dsc"

const breadcrumbNameMap: { [key: string]: string } = {
  "/information": "Information",
  "/order": "Order",
  "/mydsc": "MyDSC",
  "/strains": "Strains",
  "/plasmids": "Plasmids",
  "/phenotypes": "Phenotypes",
}

const nonClickableRoutes = new Set(["phenotypes"])

type BreadcrumbsLinkProperties = {
  /** Pathname from URL (i.e. information) */
  pathname: string
}

/**
 * BreadcrumbsLink handles the display of any breadcrumbs that are not the
 * final list item.
 */

const BreadcrumbsLink = ({ pathname }: BreadcrumbsLinkProperties) => {
  if (nonClickableRoutes.has(pathname)) {
    return (
      <Typography color="textPrimary" data-testid="breadcrumbs-text">
        {capitalizeFirstCharacter(pathname)}
      </Typography>
    )
  }

  const route = `/${pathname}`

  return (
    <Link
      color="inherit"
      component={RouterLink}
      to={route}
      data-testid="breadcrumbs-link">
      {breadcrumbNameMap[route]}
    </Link>
  )
}

export { BreadcrumbsLink }
