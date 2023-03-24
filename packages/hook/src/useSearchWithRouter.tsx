import { useState, ReactNode } from "react"
import { AutocompleteRenderInputParams } from "@material-ui/lab"
import { TextField } from "@material-ui/core"
import { Chip } from "@material-ui/core"
import { inputProps, SetURLSearchParams  } from "./types"

const emptyString: Readonly<string> = ""


/**
 * The prop type for {@link useSearchWithRouter}
 */
export interface useSearchWithRouterProps {
  /** Text that will be displayed below the input */
  help: string
  /** The label of input box */
  label: string
  /** The list of fields for searching */
  fields: string[]
  /** The react-router [function]{@link https://reactrouter.com/docs/en/v6/api#usesearchparams}
   * which allows to change the search params of the browser's url
   */
  setSearchParams: SetURLSearchParams
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
}: useSearchWithRouterProps) {
  const [hasTag, setHasTag] = useState<boolean>(false)
  const [value, setValue] = useState<string[]>([])
  const [prevChipValue, setPrevChipValue] = useState<string[]>([])
  const [activeChipValue, setActiveChipValue] = useState<string>(emptyString)
  const [input, setInput] = useState<inputProps>({
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
          setPrevChipValue((state) => [...state, activeChipValue])
          setActiveChipValue(emptyString)
        }
        setHasTag(false)
        setValue(values)
        break
      case "create-option":
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
    switch (reason) {
      case "input":
        setHasTag(false)
        setInput({ user: newInputValue, userCopy: newInputValue })
        break
      case "reset":
        setInput((state) => ({ ...state, user: emptyString }))
        setHasTag(true)
        setActiveChipValue(`${value[value.length - 1]}:${input.userCopy}`)
        searchParams.append(value[value.length - 1], input.userCopy)
        setSearchParams(searchParams)
        break
    }
  }

  /**
   * Callback when a chip is removed from the search input
   */
  const onDeleteChip = (chipValue: string) => {
    const [optValue] = chipValue.split(":")
    setValue(value.filter((v) => v !== optValue))
    searchParams.delete(optValue)
    setSearchParams(searchParams)
    if (chipValue === activeChipValue) {
      setActiveChipValue(emptyString)
      return
    }
    setPrevChipValue(prevChipValue.filter((v) => v !== chipValue))
  }

  /**
   * Callback for rendering the chips
   */
  const renderTags = (values: string[]): ReactNode => {
    if (hasTag) {
      return [...prevChipValue, activeChipValue]
        .filter((o) => o !== emptyString)
        .map((o, i) => (
          <Chip
            onDelete={() => onDeleteChip(o)}
            label={o}
            key={i + 1}
            size="small"
          />
        ))
    }
    return (
      <>
        {prevChipValue.map((o, i) => (
          <Chip
            onDelete={() => onDeleteChip(o)}
            size="small"
            key={i + 1}
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
  const renderInput = (params: AutocompleteRenderInputParams): ReactNode => {
    return (
      <TextField
        {...params}
        label={label}
        variant="outlined"
        helperText={help}
      />
    )
  }

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
