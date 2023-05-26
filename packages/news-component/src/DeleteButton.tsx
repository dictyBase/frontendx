import { IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { useDeleteContentMutation } from "dicty-graphql-schema"
import { useAtomValue, useSetAtom } from "jotai"
import { selectedArticlesAtom, clearSelectedArticles } from "./atomConfigs"

const DeleteButton = () => {
  const [deleteContent] = useDeleteContentMutation()
  const selectedArticles = useAtomValue(selectedArticlesAtom)
  const clearArticles = useSetAtom(clearSelectedArticles)

  const onClick = () => {
    selectedArticles.forEach((articleId) => {
      deleteContent({
        variables: {
          id: articleId,
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
