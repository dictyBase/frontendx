import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAuthorizedUpdateContent } from "../utils/useAuthorizedUpdateContent"

type UpdateButtonProperties = {
  contentId: string
}

const UpdateButton = ({ contentId }: UpdateButtonProperties) => {
  const [editor] = useLexicalComposerContext()
  const navigate = useNavigate()
  const authorizedUpdateContent = useAuthorizedUpdateContent(contentId)

  const handleUpdate = async () => {
    // handle error / success state
    const contentValue = JSON.stringify(editor.getEditorState().toJSON())
    await authorizedUpdateContent(contentValue)
    navigate("../editable", { relative: "path" })
  }

  return <Button onClick={handleUpdate}> Save </Button>
}

export { UpdateButton }
