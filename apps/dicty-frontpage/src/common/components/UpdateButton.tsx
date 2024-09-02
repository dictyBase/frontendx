import { useState } from "react"
import { pipe } from "fp-ts/function"
import { match as Ematch } from "fp-ts/Either"
import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAuthorizedUpdateContent } from "../hooks/useAuthorizedUpdateContent"

type UpdateButtonProperties = {
  contentId: string
}

const UpdateButton = ({ contentId }: UpdateButtonProperties) => {
  const [isLoading, setIsLoading] = useState(false)
  const [editor] = useLexicalComposerContext()
  const navigate = useNavigate()
  const authorizedUpdateContent = useAuthorizedUpdateContent(contentId)

  const handleUpdate = async () => {
    // handle error / success state
    setIsLoading(true)
    const contentValue = JSON.stringify(editor.getEditorState().toJSON())
    pipe(
      await authorizedUpdateContent(contentValue),
      Ematch(
        () => {
          setIsLoading(false)
        },
        () => {
          navigate("../editable", { relative: "path" })
        },
      ),
    )
  }

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isLoading}
      onClick={handleUpdate}>
      Save
    </Button>
  )
}

export { UpdateButton }
