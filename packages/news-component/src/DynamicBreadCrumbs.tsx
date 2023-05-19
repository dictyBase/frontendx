import { Breadcrumbs, Typography } from "@material-ui/core"
import { useLocation, Link } from "react-router-dom"

const capitalizeFirstLetter = (string: string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`

const DynamicBreadCrumbs = () => {
  const location = useLocation()
  const paths = location.pathname.split("/").slice(1)
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
