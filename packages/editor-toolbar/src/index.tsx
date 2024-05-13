import ToolBar from "@material-ui/core/Toolbar"
import { UndoButton } from "./components/UndoButton"
import { RedoButton } from "./components/RedoButton"
import { FontSizeDropdown } from "./components/FontSizeDropdown"
import { FontFamilyDropdown } from "./components/FontFamilyDropdown"
import { BlockFormatDropdown } from "./components/BlockFormatDropdown"
import { FormatBoldButton } from "./components/FormatBoldButton"
import { FormatItalicButton } from "./components/FormatItalicButton"
import { FormatUnderlineButton } from "./components/FormatUnderlineButton"
import { ColorPickerButton } from "./components/ColorPickerButton"
import { InsertTableButton } from "./components/InsertTableButton"
import { InsertImageButton } from "./components/InsertImageButton"
import { InsertLinkButton } from "./components/InsertLinkButton"
import { useCleanup } from "./hooks/useCleanup"
import { useToolbarStyles } from "./hooks/useToolbarStyles"

const DictybaseToolbar = () => {
  useCleanup()
  const { root } = useToolbarStyles()
  return (
    <ToolBar variant="dense" className={root}>
      <UndoButton />
      <RedoButton />
      <FontSizeDropdown />
      <FontFamilyDropdown />
      <BlockFormatDropdown />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <ColorPickerButton />
      <InsertLinkButton />
      <InsertTableButton />
      <InsertImageButton />
    </ToolBar>
  )
}

export { DictybaseToolbar }
