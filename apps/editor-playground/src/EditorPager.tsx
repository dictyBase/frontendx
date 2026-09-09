import { FC, useState } from "react"
import { SerializedEditorState } from "lexical"
import { DebugEditor, dictyEditorConfig } from "@dictybase/editor"
import { IconButton, Stack, ButtonGroup } from "@mui/material"
import { NavigateBefore, NavigateNext } from "@mui/icons-material"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { type ReadonlyNonEmptyArray, head as RNEAhead } from "fp-ts/ReadonlyNonEmptyArray"
import { lookup as RAlookup } from "fp-ts/ReadonlyArray"
import { map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"

const EditorPager: FC<{ contentList: ReadonlyNonEmptyArray<SerializedEditorState> }> = ({
  contentList,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const onPreviousPage = () => {
    setCurrentPage((current) => {
      const previousPage = current - 1
      return pipe(
        previousPage < 0,
        Bmatch(
          () => previousPage,
          () => current,
        ),
      )
    })
  }
  const onNextPage = () => {
    setCurrentPage((current) => (current + 1) % contentList.length)
  }
  const currentPageData = pipe(
    contentList,
    RAlookup(currentPage),
    Omap((a) => {
      return a
    }),
    OgetOrElse(() => RNEAhead(contentList)),
    JSON.stringify,
  )
  return (
    <Stack direction="column">
      <ButtonGroup>
        <IconButton onClick={onPreviousPage}>
          <NavigateBefore />
        </IconButton>
        <IconButton onClick={onNextPage}>
          <NavigateNext />
        </IconButton>
      </ButtonGroup>
      <DebugEditor
        key={currentPage}
        editable
        config={dictyEditorConfig}
        editorState={currentPageData}
      />
    </Stack>
  )
}

export { EditorPager }
