import { IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { useDeleteContentBySlugMutation } from "dicty-graphql-schema"
import { useAtomValue, useSetAtom } from "jotai"
import { selectedArticlesAtom, clearSelectedArticles } from "./atomConfigs"

const DeleteButton = () => {
  const [deleteContent] = useDeleteContentBySlugMutation()
  const selectedArticles = useAtomValue(selectedArticlesAtom)
  const clearArticles = useSetAtom(clearSelectedArticles)

  const onClick = () => {
    selectedArticles.forEach((articleSlug) => {
      deleteContent({
        variables: {
          slug: articleSlug,
        },
      })
    })
    clearArticles()
  }

  return (
    <IconButton onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  )
}

export default DeleteButton
