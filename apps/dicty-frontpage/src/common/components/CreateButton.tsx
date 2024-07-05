import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAuthorizedCreateContent } from "../hooks/useAuthorizedCreateContent"

type CreateButtonProperties = {
  namespace: string
  name: string
}

const CreateButton = ({ namespace, name }: CreateButtonProperties) => {
  const [editor] = useLexicalComposerContext()
  const navigate = useNavigate()
  const authorizedCreateContent = useAuthorizedCreateContent(namespace, name)

  const handleUpdate = async () => {
    // handle error / success state
    const contentValue = JSON.stringify(editor.getEditorState().toJSON())
    await authorizedCreateContent(contentValue)
    navigate("../editable", { relative: "path" })
  }

  return (
    <Button variant="contained" color="primary" onClick={handleUpdate}>
      Save
    </Button>
  )
}

export { CreateButton }
