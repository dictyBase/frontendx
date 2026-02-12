import { useState, ChangeEventHandler } from "react"
import { useFormContext } from "react-hook-form"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getSelection, $getRoot } from "lexical"
import {
  TextField,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material"
import { pipe } from "fp-ts/function"
import {
  orElse as OorElse,
  fromNullable as OfromNullable,
  map as Omap,
} from "fp-ts/Option"
import { UploadAsField } from "./UploadAsField"
import { $createDownloadLinkNode } from "../DownloadLinkNode"
import { type FileFormFields } from "./helpers/fileUploadHelpers"

const initialLinkText = "Click to Download"
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
  const { getValues, handleSubmit } = useFormContext<FileFormFields>()
  const [linkText, setLinkText] = useState(getValues("suggestedFilename"))
  const [editor] = useLexicalComposerContext()
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
            $getRoot()
              .getChildren()
              .find((node) => node.getType() === "paragraph"),
            OfromNullable,
            // eslint-disable-next-line dot-notation
            Omap((textNode) => textNode["select"]()),
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
    setLinkText(initialLinkText)
    handleClearForm()
    handleClose()
  }

  return (
    <>
      <DialogTitle>
        <Typography variant="h2"> Link Text </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="body1">
              Edit how the link to the file will be displayed
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Link Text"
              autoFocus
              fullWidth
              variant="outlined"
              value={linkText}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <UploadAsField />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={handleSubmit(onSubmit)}>
          Insert Link
        </Button>
      </DialogActions>
    </>
  )
}

export { InsertUrl }
