import React from "react"
import { Select, MenuItem } from "@material-ui/core"
import { BlockTypes } from "../context/atomConfigs"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"
import { useBlockFormat } from "../hooks/useBlockFormat"

const blockTypeToBlockName = {
  paragraph: "Normal",
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
  const joinedClasses = `${classes.root} ${classes.spaced}`

  const onChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    setBlockType(event.target.value as BlockTypes)
  }

  return (
    <Select
      title={title}
      className={joinedClasses}
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
