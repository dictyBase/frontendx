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
import { useCleanup } from "./hooks/useCleanup"
import { useToolbarStyles } from "./hooks/useToolbarStyles"

type DictybaseToolbarProperties = {
  handleImageUpload: (file: File) => Promise<string>
}

const DictybaseToolbar = ({ handleImageUpload }: DictybaseToolbarProperties) => {
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
      <InsertTableButton />
      <InsertImageButton handleImageUpload={handleImageUpload} />
    </ToolBar>
  )
}

export { DictybaseToolbar }
