import { IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { useDeleteContentBySlugMutation } from "dicty-graphql-schema"
import { useNavigate } from "react-router-dom"
import { useAtomValue, useSetAtom } from "jotai"
import { selectedArticlesAtom, clearSelectedArticles } from "./atomConfigs"

const DeleteButton = () => {
  const navigate = useNavigate()
  const [deleteContent] = useDeleteContentBySlugMutation()
  const selectedArticles = useAtomValue(selectedArticlesAtom)
  const clearArticles = useSetAtom(clearSelectedArticles)

  const onClick = async () => {
    await Promise.all(
      selectedArticles.map((articleSlug) =>
        deleteContent({
          variables: {
            slug: articleSlug,
          },
        }),
      ),
    )
    clearArticles()
    navigate("/news", { replace: true })
  }

  return (
    <IconButton onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  )
}

export default DeleteButton
