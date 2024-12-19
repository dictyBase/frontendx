import { useState, ChangeEventHandler } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getSelection } from "lexical"
import { $createLinkNode } from "@lexical/link"
import {
  Box,
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
import { fromNullable as OfromNullable, map as Omap } from "fp-ts/Option"

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
  handleClose: () => void
}

const InsertUrl = ({ fileUrl, handleClose }: InsertUrlProperties) => {
  const [linkText, setLinkText] = useState(fileUrl)
  const [editor] = useLexicalComposerContext()
  const classes = useStyles()
  const onChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setLinkText(value)
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
    handleClose()
  }

  return (
    <>
      <DialogTitle disableTypography>
        <Typography variant="h3"> Edit and Insert Link </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Box className={classes.root}>{fileUrl}</Box>
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
        <Button type="button" onClick={onSubmit}>
          Insert Link
        </Button>
      </DialogActions>
    </>
  )
}

export { InsertUrl }
