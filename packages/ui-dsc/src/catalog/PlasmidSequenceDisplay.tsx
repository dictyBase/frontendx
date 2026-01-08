import { useState } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { Box, IconButton, Grid, Typography, Tooltip } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { indigo } from "@mui/material/colors"

const useStyles = makeStyles<{ expanded: boolean }>()((_, { expanded }) => ({
  root: {
    backgroundColor: indigo[50],
    overflow: "scroll",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.25rem",
    fontSize: "0.9rem",
    boxShadow: "inset 1px 3px 5px hsla(248, 30%, 34%, 0.4)",
    maxHeight: expanded ? "999rem" : "10rem",
  },
  controls: {
    position: "absolute",
    width: "inherit",
    right: "2rem",
  },
}))

const ExpandButton = ({ onClick }: { onClick: () => void }) => (
  <Tooltip title={<Typography variant="caption">Expand</Typography>}>
    <IconButton aria-label="sequence-expand" onClick={onClick} size="large">
      <ExpandMoreIcon />
    </IconButton>
  </Tooltip>
)

const CollapseButton = ({ onClick }: { onClick: () => void }) => (
  <Tooltip title={<Typography variant="caption">Collapse</Typography>}>
    <IconButton aria-label="sequence-collapse" onClick={onClick} size="large">
      <ExpandLessIcon />
    </IconButton>
  </Tooltip>
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
      <IconButton aria-label="sequence-copy" onClick={handleClick} size="large">
        <FileCopyOutlinedIcon />
      </IconButton>
    </Tooltip>
  )
}

const PlasmidSequenceDisplay = ({ sequence }: { sequence: string }) => {
  const [expanded, setExpanded] = useState(false)
  const { classes } = useStyles({ expanded })
  const viewButton = pipe(
    expanded,
    Bmatch(
      () => <ExpandButton onClick={() => setExpanded(true)} />,
      () => <CollapseButton onClick={() => setExpanded(false)} />,
    ),
  )
  return (
    <Box className={classes.root}>
      <Grid container className={classes.controls}>
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
