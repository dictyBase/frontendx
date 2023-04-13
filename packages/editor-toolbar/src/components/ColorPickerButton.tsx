import { useRef } from "react"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import { IconButton, SvgIcon, Popover } from "@material-ui/core"
import { useAtomValue, useAtom } from "jotai"
import useToolbarItemStyles from "../hooks/useToolbarItemStyles"
import { fontColorAtom, colorPickerOpenAtom } from "../context/atomConfigs"
import ColorPicker from "./ColorPicker"

const title = "Font Color"
const COLOR_OPTIONS = [
  "hsl(0, 0%, 0%)",
  "hsl(210, 100%, 25.1%)",
  "hsl(210, 100%, 45%)",
  "hsl(209, 100%, 75%)",
  "hsl(211, 100%, 95%)",
  "hsl(0, 0%, 100%)",
  "hsl(53, 100%, 60%)",
]

const ColorPickerButton = () => {
  const color = useAtomValue(fontColorAtom)
  const [isOpen, setOpen] = useAtom(colorPickerOpenAtom)
  const classes = useToolbarItemStyles()
  const buttonReference = useRef(null)

  const onClose = () => {
    setOpen(false)
  }

  const toggleOpen = () => {
    setOpen(!isOpen)
  }

  return (
    <>
      <IconButton
        ref={buttonReference}
        className={classes.root}
        title={title}
        aria-label={title}
        onClick={toggleOpen}>
        <SvgIcon fontSize="small" htmlColor={color}>
          <FormatColorTextIcon />
        </SvgIcon>
      </IconButton>
      <Popover
        open={isOpen}
        anchorEl={buttonReference.current}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <ColorPicker colorOptions={COLOR_OPTIONS} />
      </Popover>
    </>
  )
}

export default ColorPickerButton
