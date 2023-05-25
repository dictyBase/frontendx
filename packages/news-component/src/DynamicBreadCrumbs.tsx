import { Breadcrumbs, Typography } from "@material-ui/core"
import { useLocation, Link } from "react-router-dom"
import { capitalizeFirstLetter, getURLPathSegments } from "./utils"

const DynamicBreadCrumbs = () => {
  const location = useLocation()
  const paths = getURLPathSegments(location.pathname)
  return (
    <Breadcrumbs>
      <Link key="/" to="/">
        Home
      </Link>
      {paths.map((path, index) =>
        index === paths.length - 1 ? (
          <Typography key={path}>{capitalizeFirstLetter(path)}</Typography>
        ) : (
          <Link key={path} to={`/${path}`}>
            {capitalizeFirstLetter(path)}
          </Link>
        ),
      )}
    </Breadcrumbs>
  )
}

export default DynamicBreadCrumbs
