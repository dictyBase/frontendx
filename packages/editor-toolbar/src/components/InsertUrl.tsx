import { useState, ChangeEventHandler } from "react"
import { useFormContext } from "react-hook-form"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getSelection, $getRoot } from "lexical"
import {
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material"
import { pipe } from "fp-ts/function"
import {
  orElse as OorElse,
  fromNullable as OfromNullable,
  map as Omap,
  isSome,
} from "fp-ts/Option"
import { SaveAsField } from "./SaveAsField"
import { $createDownloadLinkNode } from "../DownloadLinkNode"
import { type FileFormFields } from "./helpers/fileUploadHelpers"
import { findFirstParagraphNode } from "./helpers/findFirstParagraphNode"

type InsertUrlProperties = {
  fileUrl: string
  handleClose: () => void
  handleClearForm: () => void
}

const InsertUrl = ({
  fileUrl,
  handleClose,
  handleClearForm,
}: InsertUrlProperties) => {
  const {
    getValues,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FileFormFields>()
  const [linkText, setLinkText] = useState(getValues("suggestedFilename"))
  const [editor] = useLexicalComposerContext()
  const disabled = pipe(errors.suggestedFilename, OfromNullable, isSome)

  const onChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setLinkText(value)
  }
  const onCancel = () => {
    handleClearForm()
  }
  const onSubmit = () => {
    editor.update(() => {
      pipe(
        $getSelection(),
        (selection) => selection,
        OfromNullable,
        OorElse(() =>
          pipe(
            $getRoot().getChildren(),
            findFirstParagraphNode,
            // eslint-disable-next-line dot-notation
            Omap((node) => node["select"]()),
          ),
        ),
        Omap((selection) => {
          const linkNode = $createDownloadLinkNode(fileUrl, {
            download: getValues("suggestedFilename"),
          })
          const textNode = $createTextNode(linkText)
          linkNode.append(textNode)
          selection.insertNodes([linkNode])
        }),
      )
    })
    handleClearForm()
    handleClose()
  }

  return (
    <>
      <DialogTitle>
        <Typography variant="h2"> Link Text </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ padding: 1 }}>
          <TextField
            label="Link Text"
            autoFocus
            helperText=""
            fullWidth
            variant="outlined"
            value={linkText}
            onChange={onChange}
          />
          <SaveAsField />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          disabled={disabled}
          onClick={handleSubmit(onSubmit)}>
          Insert Link
        </Button>
      </DialogActions>
    </>
  )
}

export { InsertUrl }
