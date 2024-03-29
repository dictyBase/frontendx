import { makeStyles } from "@material-ui/core/styles"
import MuiBreadCrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import { useLocation, Link as RouterLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { capitalizeEveryWordInString } from "@dictybase/ui-dsc"
import { BreadcrumbsLink } from "./BreadcrumbsLink"

const useStyles = makeStyles({
  icon: {
    marginRight: "5px",
  },
})

/**
 * convertBreadcrumbTitle takes a given breadcrumb and converts it into
 * the desired format
 */
const convertBreadcrumbTitle = (crumb: string) => {
  let title = crumb
  switch (crumb) {
    case "faq":
      title = "FAQs"
      break
    case "mydsc":
      title = "MyDSC"
      break
    case "addpage":
      title = "Add Page"
      break
    default:
      // eslint-disable-next-line no-case-declarations
      const cleanString = crumb.replaceAll("+", " ").replaceAll("-", " ")
      /** don't return uppercase words if crumb is for phenotype
       * i.e. abolished+protein+phosphorylation
       */
      if (crumb.includes("+")) {
        return cleanString
      }
      // for everything else, capitalize
      return capitalizeEveryWordInString(cleanString)
  }
  return title
}

/**
 * Breadcrumbs displays navigation breadcrumbs for the DSC app.
 */

const Breadcrumbs = () => {
  const classes = useStyles()
  const location = useLocation()
  // get list of pathnames, filter out empty strings
  const pathnames: Array<string> = location.pathname
    .split("/")
    // eslint-disable-next-line unicorn/prefer-native-coercion-functions
    .filter((x: string) => x)

  return (
    <MuiBreadCrumbs aria-label="breadcrumb">
      {pathnames.length > 0 && (
        <Link
          color="inherit"
          component={RouterLink}
          to="/"
          data-testid="breadcrumbs-home">
          <FontAwesomeIcon icon={faHome} className={classes.icon} />
          DSC Home
        </Link>
      )}
      {pathnames.map((pathname, index) => {
        const isLast = index === pathnames.length - 1
        return isLast ? (
          <Typography
            key={pathname}
            color="textPrimary"
            data-testid="breadcrumbs-last">
            {convertBreadcrumbTitle(pathname)}
          </Typography>
        ) : (
          <BreadcrumbsLink key={pathname} pathname={pathname} />
        )
      })}
    </MuiBreadCrumbs>
  )
}

export { Breadcrumbs }
