import { SelectChangeEvent, MenuItem } from "@mui/material"
import { StyledSelect } from "./StyledSelect"
import { BlockTypes } from "../context/atomConfigs"
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

  const onChange = (event: SelectChangeEvent) => {
    setBlockType(event.target.value as BlockTypes)
  }

  return (
    <StyledSelect
      title={title}
      variant="standard"
      onChange={onChange}
      value={blockType}>
      {Object.keys(blockTypeToBlockName).map((option) => (
        <MenuItem key={option} value={option}>
          {blockTypeToBlockName[option as keyof typeof blockTypeToBlockName]}
        </MenuItem>
      ))}
    </StyledSelect>
  )
}

export { BlockFormatDropdown }
