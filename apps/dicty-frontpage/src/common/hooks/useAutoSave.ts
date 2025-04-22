import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import { match as Ematch } from "fp-ts/Either"
import {
  useAuthorizedUpdateContent,
  UpdateContentError,
} from "./useAuthorizedUpdateContent"

// 5 minutes in milliseconds
const DEFAULT_SAVE_INTERVAL = 1000 * 60 * 5

type useAutoSaveProperties = {
  contentId: string
  onError: (error: UpdateContentError) => void
  onSuccess: () => void
  saveInterval?: number
}
const useAutoSave = ({
  contentId,
  onError,
  onSuccess,
  saveInterval = DEFAULT_SAVE_INTERVAL,
}: useAutoSaveProperties) => {
  const [editor] = useLexicalComposerContext()
  const authorizedUpdateContent = useAuthorizedUpdateContent(contentId)

  useEffect(() => {
    const saveTimeout = setInterval(async () => {
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
    }, saveInterval)

    return () => {
      clearInterval(saveTimeout)
    }
  }, [authorizedUpdateContent, editor, onError, onSuccess, saveInterval])
}

export { useAutoSave }
