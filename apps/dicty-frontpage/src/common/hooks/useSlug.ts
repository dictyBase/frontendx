import { useParams, useLocation } from "react-router-dom"
import { getLastPathSegment } from "../utils/getLastPathSegment"
import { getSlug } from "../utils/getSlug"

/**
 * Custom React hook to get slug based on the URL parameters.
 * @returns The slug value.
 */
const useSlug = () => {
  const { name, subname } = useParams()
  const { pathname } = useLocation()
  const lastSegment = getLastPathSegment(pathname)
  return getSlug({ name, subname, lastSegment })
}

export { useSlug }
