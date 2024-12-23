import { useState, ChangeEventHandler } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getSelection } from "lexical"
import { $createLinkNode } from "@lexical/link"
import {
  TextField,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { blue, grey } from "@material-ui/core/colors"
import { pipe } from "fp-ts/function"
import {
  Option,
  fromNullable as OfromNullable,
  map as Omap,
} from "fp-ts/Option"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: blue[100],
    borderRadius: "0.625rem",
    border: `1px solid ${grey[500]}`,
  },
}))

type InsertUrlProperties = {
  fileUrl: string
  selectedFile: Option<File>
  handleClose: () => void
  handleClearForm: () => void
}

const InsertUrl = ({
  fileUrl,
  handleClose,
  handleClearForm,
}: InsertUrlProperties) => {
  const [linkText, setLinkText] = useState("Click to Download")
  const [editor] = useLexicalComposerContext()
  const classes = useStyles()
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
        // OorElse(() =>
        //   pipe(
        //     $getRoot().getChildren().find(),
        //     Ahead,
        //     Omap((textNode) => textNode.select()),
        //   ),
        // ),
        Omap((selection) => {
          const linkNode = $createLinkNode(fileUrl)
          const textNode = $createTextNode(linkText)
          linkNode.append(textNode)
          selection.insertNodes([linkNode])
        }),
      )
    })
    setLinkText("")
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
              fullWidth
              variant="outlined"
              value={linkText}
              onChange={onChange}
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
