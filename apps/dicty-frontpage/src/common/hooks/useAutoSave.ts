import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import { match as Ematch } from "fp-ts/Either"
import { useAuthorizedUpdateContent } from "./useAuthorizedUpdateContent"
import { ContentError } from "../constants/types"

type useAutoSaveProperties = {
  contentId: string
  contentSlug: string
  onError: (error: ContentError) => void
  onSuccess: () => void
}

const useAutoSave = ({
  contentId,
  onError,
  onSuccess,
}: useAutoSaveProperties) => {
  const [editor] = useLexicalComposerContext()
  const authorizedUpdateContent = useAuthorizedUpdateContent(contentId)
  useEffect(
    () =>
      editor.registerUpdateListener(
        async ({ editorState, prevEditorState }) => {
          const previousEditorContent = JSON.stringify(prevEditorState.toJSON())
          const editorContent = JSON.stringify(editorState.toJSON())
          if (previousEditorContent === editorContent) return
          pipe(
            await authorizedUpdateContent(editorContent),
            Ematch(
              (error) => {
                onError(error)
              },
              () => {
                onSuccess()
              },
            ),
          )
        },
      ),
    [authorizedUpdateContent, editor, onError, onSuccess],
  )
}

export { useAutoSave }
