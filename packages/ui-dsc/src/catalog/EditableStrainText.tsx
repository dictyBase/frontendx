import { ReactNode, Dispatch, SetStateAction } from "react"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import { formatFormattedString } from "../utils/formatFormattedString"

type EditableStrainTextProperties = {
  /** Text value of the strain field */
  text: string
  /** Optional custom ReactNode to display in read mode */
  displayValue?: ReactNode
  /** State setter to switch into editing mode */
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

/**
 * Displays a strain field's value along with an Edit button to enter inline editing mode.
 *
 * @param properties - Field text, optional display ReactNode, and edit state setter.
 * @returns The rendered EditableStrainText component.
 */
const EditableStrainText = ({
  text,
  displayValue,
  setIsEditing,
}: EditableStrainTextProperties) => {
  const handleClick = () => {
    setIsEditing(true)
  }

  const renderedContent = pipe(
    displayValue,
    OfromNullable,
    OgetOrElse((): ReactNode => formatFormattedString(text)),
  )

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}>
      <div>{renderedContent}</div>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Edit
        </Button>
      </Stack>
    </Stack>
  )
}

export { EditableStrainText, type EditableStrainTextProperties }
