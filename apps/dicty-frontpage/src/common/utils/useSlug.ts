import { useParams } from "react-router-dom"
import { getSlug } from "./getSlug"

const useSlug = () => {
  const { name, subname } = useParams()
  return getSlug({ name, subname })
}

export { useSlug }
