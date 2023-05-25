import { Button } from "@material-ui/core"
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
    <Button variant="contained" onClick={onClick}>
      Delete
    </Button>
  )
}

export default DeleteButton
