import { useState, ReactNode } from "react"
import { AutocompleteRenderInputParams } from "@material-ui/lab"
import { TextField, Chip } from "@material-ui/core"
import { v4 as uuid4 } from "uuid"
import { inputProperties, SetURLSearchParameters } from "./types"

const emptyString: Readonly<string> = ""

/**
 * The prop type for {@link useSearchWithRouter}
 */
export interface useSearchWithRouterProperties {
  /** Text that will be displayed below the input */
  help: string
  /** The label of input box */
  label: string
  /** The list of fields for searching */
  fields: string[]
  /** The react-router [function]{@link https://reactrouter.com/docs/en/v6/api#usesearchparams}
   * which allows to change the search params of the browser's url
   */
  setSearchParams: SetURLSearchParameters
  /** The {@link https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams | URLSearchParams object}
   */
  searchParams: URLSearchParams
}

/**
 * Hook to be used with {@link https://v4.mui.com/| material ui's} {@link
 * https://v4.mui.com/components/autocomplete/ | AutoComplete} component to
 * create a search box. The search box integrates with {@link
 * https://reactrouter.com/docs/en/v6|react router} and changes the query
 * parameter of the browser's url according to the user input.
 *
 * @see {@link https://v4.mui.com/api/autocomplete}
 */
export function useSearchWithRouter({
  fields,
  label,
  help,
  setSearchParams,
  searchParams,
}: useSearchWithRouterProperties) {
  const [hasTag, setHasTag] = useState<boolean>(false)
  const [value, setValue] = useState<Array<string>>([])
  const [previousChipValue, setPreviousChipValue] = useState<string[]>([])
  const [activeChipValue, setActiveChipValue] = useState<string>(emptyString)
  const [input, setInput] = useState<inputProperties>({
    user: emptyString,
    userCopy: emptyString,
  })
  const filterFields = () => fields.filter((o) => !value.includes(o))

  /**
   * Callback that gets fired when one option from dropdown gets selected
   */
  const onChange = (_: any, values: string[], reason: string): void => {
    switch (reason) {
      case "select-option":
        if (activeChipValue) {
          setPreviousChipValue((state) => [...state, activeChipValue])
          setActiveChipValue(emptyString)
        }
        setHasTag(false)
        setValue(values)
        break
      case "create-option":
        break
      default:
        break
    }
  }

  /**
   * Callback that gets fired on two occasions.
   *  i) when an user starts typeing after selecting one of the option.
   *  ii) when the user finished the input and press the [enter] key.
   */
  const onInputChange = (
    event: React.ChangeEvent<{}>,
    newInputValue: string,
    reason: string,
  ): void => {
    if (!["change", "keydown"].includes(event.type)) return
    if (reason === "input") {
      setHasTag(false)
      setInput({ user: newInputValue, userCopy: newInputValue })
      return
    }
    setInput((state) => ({ ...state, user: emptyString }))
    setHasTag(true)
    const lastValue = value.at(-1)
    if (lastValue) {
      setActiveChipValue(`${lastValue}:${input.userCopy}`)
      searchParams.append(lastValue, input.userCopy)
      setSearchParams(searchParams)
    }
  }

  /**
   * Callback when a chip is removed from the search input
   */
  const onDeleteChip = (chipValue: string) => {
    const [optValue] = chipValue.split(":")
    setValue(value.filter((v) => v !== optValue))
    if (optValue) {
      searchParams.delete(optValue)
    }
    setSearchParams(searchParams)
    if (chipValue === activeChipValue) {
      setActiveChipValue(emptyString)
      return
    }
    setPreviousChipValue(previousChipValue.filter((v) => v !== chipValue))
  }

  /**
   * Callback for rendering the chips
   */
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
        <div>{`${values[values.length - 1]}:`}</div>
      </>
    )
  }

  /**
   * Callback for rendering the search box
   */
  const renderInput = (parameters: AutocompleteRenderInputParams) => (
    <TextField
      {...parameters}
      size="small"
      label={label}
      variant="outlined"
      helperText={help}
    />
  )

  return {
    value,
    input,
    setValue,
    onChange,
    onInputChange,
    renderTags,
    filterFields,
    renderInput,
  }
}
