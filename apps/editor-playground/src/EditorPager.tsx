import { FC, useState } from "react"
import { SerializedEditorState } from "lexical"
import { DebugEditor, dictyEditorConfig } from "@dictybase/editor"
import { IconButton, Stack, ButtonGroup, Typography } from "@mui/material"
import { NavigateBefore, NavigateNext } from "@mui/icons-material"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { keys as Rkeys } from "fp-ts/Record"
import { size as Asize, lookup as Alookup } from "fp-ts/Array"
import { map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { flexLayoutStateString } from "@dictybase/editor"

const EditorPager: FC<{ contentRecord: Record<string, SerializedEditorState> }> = ({
  contentRecord,
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
    setCurrentPage((current) => (current + 1) % pipe(contentRecord, Rkeys, Asize))
  }
  const OcurrentPageKey = pipe(contentRecord, Rkeys, Alookup(currentPage))
  const currentPageKey = pipe(
    OcurrentPageKey,
    OgetOrElse(() => ""),
  )
  const currentPageData = pipe(
    OcurrentPageKey,
    Omap((key) => contentRecord[key]),
    // OgetOrElse(() => Ahead(contentRecord)),
    Omap(JSON.stringify),
    OgetOrElse(() => flexLayoutStateString),
  )
  return (
    <Stack direction="column">
      <Stack direction="row">
        <ButtonGroup>
          <IconButton onClick={onPreviousPage}>
            <NavigateBefore />
          </IconButton>
          <IconButton onClick={onNextPage}>
            <NavigateNext />
          </IconButton>
        </ButtonGroup>
        <Typography>{currentPageKey}</Typography>
      </Stack>
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
