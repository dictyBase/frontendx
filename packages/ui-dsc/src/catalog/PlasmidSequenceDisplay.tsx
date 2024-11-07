import { useState } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  makeStyles,
  Box,
  IconButton,
  Grid,
  Typography,
  Tooltip,
} from "@material-ui/core"
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import indigo from "@material-ui/core/colors/indigo"

const useStyles = makeStyles({
  root: {
    backgroundColor: indigo[50],
    overflow: "scroll",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.25rem",
    fontSize: "0.9rem",
    boxShadow: "inset 1px 3px 5px hsla(248, 30%, 34%, 0.4)",
    maxHeight: ({ expanded }: { expanded: boolean }) =>
      expanded ? "999rem" : "10rem",
  },
  controls: {
    position: "absolute",
    width: "inherit",
    right: "2rem",
  },
})

const ExpandButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton onClick={onClick}>
    <ExpandMoreIcon />
  </IconButton>
)
const CollapseButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton onClick={onClick}>
    <ExpandLessIcon />
  </IconButton>
)

const CopyTextButton = ({ text }: { text: string }) => {
  const [textCopied, setTextCopied] = useState(false)
  const handleClose = () => {
    setTextCopied(false)
  }

  const handleClick = async () => {
    // eslint-disable-next-line compat/compat
    await window.navigator.clipboard.writeText(text)
    setTextCopied(true)
  }
  return (
    <Tooltip
      onClose={handleClose}
      title={
        <Typography variant="caption">
          {textCopied ? "Text Copied!" : "Copy text to clipboard"}
        </Typography>
      }>
      <IconButton onClick={handleClick}>
        <FileCopyOutlinedIcon />
      </IconButton>
    </Tooltip>
  )
}

const PlasmidSequenceDisplay = ({ sequence }: { sequence: string }) => {
  const [expanded, setExpanded] = useState(false)
  const { root, controls } = useStyles({ expanded })
  const viewButton = pipe(
    expanded,
    Bmatch(
      () => <ExpandButton onClick={() => setExpanded(true)} />,
      () => <CollapseButton onClick={() => setExpanded(false)} />,
    ),
  )
  return (
    <Box className={root}>
      <Grid container className={controls}>
        <Grid item>
          <CopyTextButton text={sequence} />
        </Grid>
        <Grid item>{viewButton}</Grid>
      </Grid>
      <pre>{sequence}</pre>
    </Box>
  )
}

export { PlasmidSequenceDisplay }
