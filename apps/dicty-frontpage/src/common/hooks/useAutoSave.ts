import { useState, useEffect, useRef } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import { Option, none, some, map as Omap } from "fp-ts/Option"
import { useAuthorizedUpdateContentWithStates } from "./useAuthorizedUpdateContentWithStates"

type useAutoSaveProperties = {
  contentId: string
}

const useAutoSave = ({ contentId }: useAutoSaveProperties) => {
  const [editor] = useLexicalComposerContext()
  const [waiting, setWaiting] = useState(false)
  const [authorizedUpdateContent, { loading, error, data, reset }] =
    useAuthorizedUpdateContentWithStates(contentId)
  const timeoutIdReference = useRef<Option<NodeJS.Timeout>>(none)
  useEffect(() => {
    const cleanupListener = editor.registerUpdateListener(
      ({ editorState, prevEditorState }) => {
        const previousEditorContent = JSON.stringify(prevEditorState.toJSON())
        const editorContent = JSON.stringify(editorState.toJSON())
        if (previousEditorContent === editorContent) return

        setWaiting(true)
        pipe(timeoutIdReference.current, Omap(clearTimeout))
        reset()

        const timeoutId = setTimeout(async () => {
          setWaiting(false)
          await authorizedUpdateContent(editorContent)
        }, 1000)
        timeoutIdReference.current = some(timeoutId)
      },
    )
    return () => {
      cleanupListener()
    }
  }, [authorizedUpdateContent, editor, reset])

  useEffect(
    () => () => {
      pipe(timeoutIdReference.current, Omap(clearTimeout))
    },
    [],
  )
  return { waiting, loading, error, data }
}

export { useAutoSave }
