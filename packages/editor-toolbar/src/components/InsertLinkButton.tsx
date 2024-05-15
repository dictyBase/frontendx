import { useState, useRef, ChangeEvent } from "react"
import {
  IconButton,
  Popper,
  TextField,
  Button,
  Paper,
  Grid,
  makeStyles,
} from "@material-ui/core"
import InsertLinkIcon from "@material-ui/icons/InsertLink"
import { $createLinkNode } from "@lexical/link"
import { $createTextNode, $getSelection } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { pipe } from "fp-ts/function"
import { MonoidAny } from "fp-ts/boolean"
import { isEmpty } from "fp-ts/string"
import { tryCatch as IOEtryCatch, map as IOEmap } from "fp-ts/IOEither"
import { match } from "ts-pattern"

const useInsertLinkButtonStyles = makeStyles({
  popper: { padding: "1rem" },
})

const InsertLinkButton = () => {
  const [editor] = useLexicalComposerContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isInvalidURL, setIsInvalidURL] = useState(false)
  const [linkText, setLinkText] = useState("")
  const [hrefText, setHrefText] = useState("")
  const buttonRef = useRef(null)
  const { popper } = useInsertLinkButtonStyles()

  const handleClick = () => {
    setIsMenuOpen((previousState) => !previousState)
  }

  const handleLinkTextChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setLinkText(value)
  }

  const handleLinkHrefChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (isInvalidURL) setIsInvalidURL(false)
    setHrefText(value)
  }

  const handleSubmit = pipe(
    IOEtryCatch(
      // implement URL validation here
      () => {},
      () => {
        setIsInvalidURL(true)
      },
    ),
    IOEmap(() => {
      editor.update(() => {
        const selection = $getSelection()
        if (!selection) return
        const linkNode = $createLinkNode(hrefText)
        const textNode = $createTextNode(linkText)
        linkNode.append(textNode)
        selection.insertNodes([linkNode, $createTextNode("")])
      })
      setIsMenuOpen(false)
      setLinkText("")
      setHrefText("")
    }),
  )

  const fieldsAreEmpty = MonoidAny.concat(isEmpty(linkText), isEmpty(hrefText))
  const urlHelpText = match(isInvalidURL)
    .with(true, () => "Invalid URL")
    .with(false, () => "")
    .exhaustive()

  return (
    <>
      <IconButton ref={buttonRef} title="Insert Link" onClick={handleClick}>
        <InsertLinkIcon />
      </IconButton>
      <Popper anchorEl={buttonRef.current} open={isMenuOpen}>
        <Paper className={popper}>
          <Grid container alignItems="center" spacing={2} direction="column">
            <Grid item>
              <TextField label="Link Text" onChange={handleLinkTextChange} />
            </Grid>
            <Grid item>
              <TextField
                label="Link URL"
                helperText={urlHelpText}
                error={isInvalidURL}
                onChange={handleLinkHrefChange}
              />
            </Grid>
            <Grid item>
              <Button
                disabled={fieldsAreEmpty}
                variant="contained"
                onClick={handleSubmit}>
                Insert Link
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Popper>
    </>
  )
}

export { InsertLinkButton }
