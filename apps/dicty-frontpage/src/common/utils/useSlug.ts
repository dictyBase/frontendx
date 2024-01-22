import { useParams } from "react-router-dom"
import { getSlug } from "./getSlug"

/**
 * Custom React hook to get slug based on the URL parameters.
 * @returns The slug value.
 */
const useSlug = () => {
  const { name, subname } = useParams()
  return getSlug({ name, subname })
}

export { useSlug }
