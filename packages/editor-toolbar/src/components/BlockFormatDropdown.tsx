import { Select, SelectChangeEvent, MenuItem } from "@mui/material"
import { BlockTypes } from "../context/atomConfigs"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"
import { useBlockFormat } from "../hooks/useBlockFormat"

const blockTypeToBlockName = {
  "flex-layout": "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  bullet: "Bulleted List",
  number: "Numbered List",
  quote: "Quote",
}

const title = "Block Type"

const BlockFormatDropdown = () => {
  const [blockType, setBlockType] = useBlockFormat()
  const classes = useToolbarItemStyles()

  const onChange = (event: SelectChangeEvent) => {
    setBlockType(event.target.value as BlockTypes)
  }

  return (
    <Select
      title={title}
      variant="standard"
      sx={{ ...classes.root, ...classes.spaced }}
      onChange={onChange}
      value={blockType}>
      {Object.keys(blockTypeToBlockName).map((option) => (
        <MenuItem key={option} value={option}>
          {blockTypeToBlockName[option as keyof typeof blockTypeToBlockName]}
        </MenuItem>
      ))}
    </Select>
  )
}

export { BlockFormatDropdown }
