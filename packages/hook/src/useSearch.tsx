import { useState, ReactNode } from "react"
import { AutocompleteRenderInputParams } from "@material-ui/lab"
import { TextField } from "@material-ui/core"
import { Chip } from "@material-ui/core"

interface inputProps {
  user: string,
  userCopy: string
}

interface useSearchProps {
  help: string,
  label: string,
  fields: string[]
}


const emptyString = ""

export function useSearch({ fields, label, help }: useSearchProps) {
  const [hasTag, setHasTag] = useState<boolean>(false)
  const [value, setValue] = useState<string[]>([])
  const [prevChipValue, setPrevChipValue] = useState<string[]>([])
  const [activeChipValue, setActiveChipValue] = useState<string>(emptyString)
  const [input, setInput] = useState<inputProps>({ user: emptyString, userCopy: emptyString })

  const onChange = (_: any, values: string[], reason: string): void => {
    if (reason !== "select-option") return
    if (activeChipValue) {
      setPrevChipValue(state => ([...state, activeChipValue]))
      setActiveChipValue(emptyString)
    }
    setHasTag(false)
    setValue(values)
  }

  const onInputChange = (
    event: React.ChangeEvent<{}>,
    newInputValue: string,
    reason: string
  ): void => {
    if (!["change", "keydown"].includes(event.type)) return
    switch (reason) {
      case "input":
        setHasTag(false)
        setInput({ user: newInputValue, userCopy: newInputValue })
        break
      case "reset":
        setInput(state => ({ ...state, user: emptyString }))
        setHasTag(true)
        setActiveChipValue(`${value[value.length - 1]}:${input.userCopy}`)
        break
    }
  }

  const onDeleteChip = (chipValue: string) => {
    const optValue = chipValue.split(":")[0]
    setValue(value.filter(v => v !== optValue))
    if (chipValue === activeChipValue) {
      setActiveChipValue(emptyString)
      return
    }
    setPrevChipValue(prevChipValue.filter(v => v !== chipValue))
  }

  const renderTags = (values: string[]): ReactNode => {
    if (hasTag) {
      return [...prevChipValue, activeChipValue]
        .filter(o => o !== emptyString)
        .map((o, i) =>
          <Chip
            onDelete={() => onDeleteChip(o)}
            label={o}
            key={i}
            size="small"
          />
        )
    }
    return (
      <>
        {prevChipValue.map((o, i) =>
          <Chip
            onDelete={() => onDeleteChip(o)}
            size="small"
            key={i}
            label={o}
          />
        )}
        <div>
          {`${values[values.length - 1]}:`}
        </div>
      </>
    )
  }

  const renderInput = (params: AutocompleteRenderInputParams): ReactNode => {
    return <TextField
      {...params}
      label={label}
      variant="outlined"
      helperText={help}
    />
  }

  const filterFields = () => fields.filter(o => !value.includes(o))

  return {
    value,
    input,
    onChange,
    onInputChange,
    renderTags,
    filterFields,
    renderInput
  }
}
