import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { match as Ematch } from "fp-ts/Either"
import { useContentBySlugLazyQuery } from "dicty-graphql-schema"
import { useAuthorizedUpdateContent } from "./useAuthorizedUpdateContent"
import { ContentError } from "../types"

// 5 minutes in milliseconds
const DEFAULT_SAVE_INTERVAL = 1000 * 60 * 5

type useAutoSaveProperties = {
  contentId: string
  contentSlug: string
  onError: (error: ContentError) => void
  onSuccess: () => void
  saveInterval?: number
}
const useAutoSave = ({
  contentId,
  contentSlug,
  onError,
  onSuccess,
  saveInterval = DEFAULT_SAVE_INTERVAL,
}: useAutoSaveProperties) => {
  const [editor] = useLexicalComposerContext()
  const authorizedUpdateContent = useAuthorizedUpdateContent(contentId)
  const [getContentBySlug] = useContentBySlugLazyQuery({
    variables: { slug: contentSlug },
  })

  useEffect(() => {
    const saveTimeout = setInterval(async () => {
      const editorContent = JSON.stringify(editor.getEditorState().toJSON())
      const { data } = await getContentBySlug()
      const isContentChanged = pipe(
        data,
        OfromNullable,
        OflatMap(({ contentBySlug }) => OfromNullable(contentBySlug)),
        Omap(({ content }) => content !== editorContent),
        OgetOrElse(() => false),
      )
      if (isContentChanged) {
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
      }
    }, saveInterval)

    return () => {
      clearInterval(saveTimeout)
    }
  }, [
    authorizedUpdateContent,
    editor,
    getContentBySlug,
    onError,
    onSuccess,
    saveInterval,
  ])
}

export { useAutoSave }
