import { Stack, Toolbar } from "@mui/material"
import { UndoButton } from "./components/UndoButton"
import { RedoButton } from "./components/RedoButton"
import { FontSizeDropdown } from "./components/FontSizeDropdown"
import { FontFamilyDropdown } from "./components/FontFamilyDropdown"
import { BlockFormatDropdown } from "./components/BlockFormatDropdown"
import { FormatBoldButton } from "./components/FormatBoldButton"
import { FormatItalicButton } from "./components/FormatItalicButton"
import { FormatUnderlineButton } from "./components/FormatUnderlineButton"
import { ColorPickerButton } from "./components/ColorPickerButton"
import { InsertLinkButton } from "./components/InsertLinkButton"
import { InsertTableButton } from "./components/InsertTableButton"
import { InsertSampleImageButton } from "./components/InsertSampleImageButton"
import { InspectButton } from "./components/InspectButton"
import { CopyStateButton } from "./components/CopyStateButton"
import { useCleanup } from "./hooks/useCleanup"

const DebugToolbar = () => {
  useCleanup()
  return (
    <Toolbar
      variant="dense"
      sx={{
        columnGap: "8px",
        marginBottom: "1px",
        background: "#fff",
      }}
    >
      <Stack direction="row">
        <UndoButton />
        <RedoButton />
      </Stack>
      <Stack direction="row" spacing={2}>
        <FontSizeDropdown />
        <FontFamilyDropdown />
        <BlockFormatDropdown />
      </Stack>
      <Stack direction="row">
        <FormatBoldButton />
        <FormatItalicButton />
        <FormatUnderlineButton />
        <ColorPickerButton />
        <InsertLinkButton />
        <InsertSampleImageButton />
        <InsertTableButton />
        <InspectButton />
        <CopyStateButton />
      </Stack>
    </Toolbar>
  )
}

export { DebugToolbar }
