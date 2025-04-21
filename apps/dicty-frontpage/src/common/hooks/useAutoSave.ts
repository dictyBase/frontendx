import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import { match as Ematch } from "fp-ts/Either"
import {
  useAuthorizedUpdateContent,
  UpdateContentError,
} from "./useAuthorizedUpdateContent"

// 5 minutes in milliseconds
const SAVE_INTERVAL = 1000 * 60 * 5

type useAutoSaveProperties = {
  contentId: string
  onError: (error: UpdateContentError) => void
  onSuccess: () => void
}
const useAutoSave = ({
  contentId,
  onError,
  onSuccess,
}: useAutoSaveProperties) => {
  const [editor] = useLexicalComposerContext()
  const authorizedUpdateContent = useAuthorizedUpdateContent(contentId)

  useEffect(() => {
    const saveInterval = setInterval(async () => {
      const contentValue = JSON.stringify(editor.getEditorState().toJSON())
      const result = await authorizedUpdateContent(contentValue)
      pipe(
        result,
        Ematch(
          (error) => {
            onError(error)
          },
          () => {
            onSuccess()
          },
        ),
      )
    }, SAVE_INTERVAL)

    return () => {
      clearInterval(saveInterval)
    }
  }, [authorizedUpdateContent, editor, onError, onSuccess])
}

export { useAutoSave }
