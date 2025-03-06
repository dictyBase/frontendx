import { useState, ChangeEventHandler } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getSelection, $getRoot } from "lexical"
import { $createLinkNode } from "@lexical/link"
import {
  TextField,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import {
  orElse as OorElse,
  fromNullable as OfromNullable,
  map as Omap,
} from "fp-ts/Option"
import { $createDictyLinkNode } from "../DictyLinkNode"

type InsertUrlProperties = {
  fileUrl: string
  initialFileName: string
  handleClose: () => void
  handleClearForm: () => void
}

const InsertUrl = ({
  fileUrl,
  initialFileName,
  handleClose,
  handleClearForm,
}: InsertUrlProperties) => {
  const [linkText, setLinkText] = useState("Click to Download")
  const [fileName, setFileName] = useState(initialFileName)
  const [editor] = useLexicalComposerContext()
  const onChangeLinkText: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setLinkText(value)
  }
  const onChangeFileName: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setFileName(value)
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
          const linkNode = $createDictyLinkNode(fileUrl, { download: fileName })
          const textNode = $createTextNode(linkText)
          console.log(linkNode)
          linkNode.append(textNode)
          selection.insertNodes([linkNode])
        }),
      )
    })
    setLinkText("")
    setFileName("")
    handleClearForm()
    handleClose()
  }

  return (
    <>
      <DialogTitle disableTypography>
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
              onChange={onChangeLinkText}
            />
          </Grid>
          <Grid item>
            <TextField
              label="File Name"
              fullWidth
              variant="outlined"
              value={fileName}
              onChange={onChangeFileName}
            />
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
          onClick={onSubmit}>
          Insert Link
        </Button>
      </DialogActions>
    </>
  )
}

export { InsertUrl }
