import { pipe } from "fp-ts/function"
import {
  Monoid as SMonoid,
  split as Ssplit,
  isEmpty as SisEmpty,
} from "fp-ts/string"
import {
  filter as RAfilter,
  map as RAmap,
  init as RAinit,
  last as RAlast,
  takeLeft as RAtakeLeft,
  intercalate as RAintercalate,
} from "fp-ts/ReadonlyArray"
import {
  getOrElse as OgetOrElse,
  match as Omatch,
  map as Omap,
} from "fp-ts/Option"
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

const roleSegments = new Set(["show", "editable", "edit"])
/**
 * Breadcrumbs displays navigation breadcrumbs for the DSC app.
 * 1. Get the pathname.
 * 2. Separate into array of pathnames delimited by `/`.
 * 3. Filter out empty strings.
 * 4. Filter out role-based route segments.
 * 5. A segment should be rendered as a Link if:
 *      - It is not the final segment.
 *      - If it represents an existing page.
 * 6. Otherwise, render it as plain text.
 */
const Breadcrumbs = () => {
  const classes = useStyles()
  const location = useLocation()
  const pathnames = pipe(
    location.pathname,
    Ssplit("/"),
    RAfilter((s) => !SisEmpty(s)),
    RAfilter((s) => !roleSegments.has(s)),
  )
  const initialSegments = pipe(
    pathnames,
    RAinit,
    OgetOrElse(() => [] as readonly string[]),
    // Each path segment should be rendered as either plain text or a link.
    RAmap((s) => {
      const path = pipe(
        pathnames,
        RAtakeLeft(pathnames.indexOf(s) + 1),
        RAintercalate(SMonoid)("/"),
      )
      return <BreadcrumbsLink key={s} name={s} path={path} />
    }),
  )
  const lastSegment = pipe(
    pathnames,
    RAlast,
    Omap(convertBreadcrumbTitle),
    Omatch(
      () => <></>,
      (s) => (
        <Typography key={s} color="textPrimary" data-testid="breadcrumbs-last">
          {s}
        </Typography>
      ),
    ),
  )
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
      {initialSegments}
      {lastSegment}
    </MuiBreadCrumbs>
  )
}

export { Breadcrumbs }
