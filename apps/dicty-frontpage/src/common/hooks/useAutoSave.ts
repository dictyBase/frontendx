import { useState, useEffect, useRef } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import { match as Ematch } from "fp-ts/Either"
import { Option, none, some, map as Omap } from "fp-ts/Option"
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
  const [isSaved, setIsSaved] = useState(true)
  const authorizedUpdateContent = useAuthorizedUpdateContent(contentId)
  const timeoutIdReference = useRef<Option<NodeJS.Timeout>>(none)
  useEffect(() => {
    const cleanupListener = editor.registerUpdateListener(
      ({ editorState, prevEditorState }) => {
        const previousEditorContent = JSON.stringify(prevEditorState.toJSON())
        const editorContent = JSON.stringify(editorState.toJSON())
        if (previousEditorContent === editorContent) return
        setIsSaved(false)
        pipe(timeoutIdReference.current, Omap(clearTimeout))
        const timeoutId = setTimeout(async () => {
          pipe(
            await authorizedUpdateContent(editorContent),
            Ematch(
              (error) => {
                onError(error)
                setIsSaved(false)
              },
              () => {
                onSuccess()
                setIsSaved(true)
              },
            ),
          )
        }, 1500)
        timeoutIdReference.current = some(timeoutId)
      },
    )
    return () => {
      cleanupListener()
    }
  }, [authorizedUpdateContent, editor, onError, onSuccess])

  useEffect(
    () => () => {
      pipe(timeoutIdReference.current, Omap(clearTimeout))
    },
    [],
  )
  return isSaved
}

export { useAutoSave }
