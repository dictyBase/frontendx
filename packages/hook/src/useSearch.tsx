import { useState, ReactNode } from "react"
import { AutocompleteRenderInputParams } from "@material-ui/lab"
import { TextField, Chip } from "@material-ui/core"
import { v4 as uuid4 } from "uuid"

interface inputProperties {
  user: string
  userCopy: string
}

interface useSearchProperties {
  help: string
  label: string
  fields: string[]
}

const emptyString = ""

export function useSearch({ fields, label, help }: useSearchProperties) {
  const [hasTag, setHasTag] = useState<boolean>(false)
  const [value, setValue] = useState<string[]>([])
  const [previousChipValue, setPreviousChipValue] = useState<string[]>([])
  const [activeChipValue, setActiveChipValue] = useState<string>(emptyString)
  const [input, setInput] = useState<inputProperties>({
    user: emptyString,
    userCopy: emptyString,
  })

  const onChange = (_: any, values: string[], reason: string): void => {
    if (reason !== "select-option") return
    if (activeChipValue) {
      setPreviousChipValue((state) => [...state, activeChipValue])
      setActiveChipValue(emptyString)
    }
    setHasTag(false)
    setValue(values)
  }

  const onInputChange = (
    event: React.ChangeEvent<{}>,
    newInputValue: string,
    reason: string,
  ): void => {
    if (!["change", "keydown"].includes(event.type)) return
    switch (reason) {
      case "input":
        setHasTag(false)
        setInput({ user: newInputValue, userCopy: newInputValue })
        break
      case "reset":
        setInput((state) => ({ ...state, user: emptyString }))
        setHasTag(true)
        setActiveChipValue(`${value.at(-1)}:${input.userCopy}`)
        break
      default:
        break
    }
  }

  const onDeleteChip = (chipValue: string) => {
    const optValue = chipValue.split(":")[0]
    setValue(value.filter((v) => v !== optValue))
    if (chipValue === activeChipValue) {
      setActiveChipValue(emptyString)
      return
    }
    setPreviousChipValue(previousChipValue.filter((v) => v !== chipValue))
  }

  const renderTags = (values: string[]): ReactNode => {
    if (hasTag) {
      return [...previousChipValue, activeChipValue]
        .filter((o) => o !== emptyString)
        .map((o) => (
          <Chip
            onDelete={() => onDeleteChip(o)}
            label={o}
            key={uuid4()}
            size="small"
          />
        ))
    }
    return (
      <>
        {previousChipValue.map((o) => (
          <Chip
            onDelete={() => onDeleteChip(o)}
            size="small"
            key={uuid4()}
            label={o}
          />
        ))}
        <div>{`${values.at(-1)}:`}</div>
      </>
    )
  }

  const renderInput = (parameters: AutocompleteRenderInputParams) => (
    <TextField
      {...parameters}
      size="small"
      label={label}
      variant="outlined"
      helperText={help}
    />
  )

  const filterFields = () => fields.filter((o) => !value.includes(o))

  return {
    value,
    input,
    onChange,
    onInputChange,
    renderTags,
    filterFields,
    renderInput,
  }
}
