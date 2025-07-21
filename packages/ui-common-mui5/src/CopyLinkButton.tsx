import { useState } from "react"
import { pipe } from "fp-ts/function"
import { replace as Sreplace } from "fp-ts/string"
import { Typography, IconButton, Tooltip } from "@material-ui/core"
import LinkRoundedIcon from "@material-ui/icons/LinkRounded"

const CopyLinkButton = () => {
  const [linkCopied, setLinkCopied] = useState(false)
  const handleClose = () => {
    setLinkCopied(false)
  }

  const handleClick = async () => {
    const url = pipe(
      window.location.href,
      Sreplace(/\b(edit|editable)\b/i, "show"),
    )
    // eslint-disable-next-line compat/compat
    await window.navigator.clipboard.writeText(url)
    setLinkCopied(true)
  }

  return (
    <Tooltip
      onClose={handleClose}
      title={
        <Typography variant="caption">
          {linkCopied ? "Link Copied!" : "Copy Link to Article"}
        </Typography>
      }>
      <IconButton onClick={handleClick}>
        <LinkRoundedIcon />
      </IconButton>
    </Tooltip>
  )
}

export { CopyLinkButton }
