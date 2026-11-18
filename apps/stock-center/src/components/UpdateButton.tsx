import { Button } from "@mui/material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAuthorizedUpdateContent } from "../hooks/useAuthorizedUpdateContent"

type UpdateButtonProperties = {
  contentId: string
  canSave: boolean
}

const UpdateButton = ({ contentId, canSave }: UpdateButtonProperties) => {
  const [editor] = useLexicalComposerContext()
  const authorizedUpdateContent = useAuthorizedUpdateContent(contentId)

  const handleUpdate = async () => {
    // handle error / success state
    const contentValue = JSON.stringify(editor.getEditorState().toJSON())
    await authorizedUpdateContent(contentValue)
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleUpdate}
      disabled={!canSave}>
      Save
    </Button>
  )
}

export { UpdateButton }
