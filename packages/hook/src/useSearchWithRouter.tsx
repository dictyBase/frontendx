import { useState, ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { map, filter, reduce } from "fp-ts/Array"
import { useSearchParams } from "react-router-dom"
import { AutocompleteRenderInputParams } from "@material-ui/lab"
import { TextField, Chip } from "@material-ui/core"
import { v4 as uuid4 } from "uuid"
import { FieldOption } from "@dictybase/ui-dsc"
import { inputProperties } from "./types"

const emptyString: Readonly<string> = ""

const getInitialSearchValues = (
  searchParameters: URLSearchParams,
  fields: Array<string>,
) => {
  const filteredParameters = pipe(
    [...searchParameters.entries()],
    filter(([k]) => fields.includes(k)),
    reduce([] as Array<[string, string]>, (b, parameter) =>
      b.findIndex(([k]) => k === parameter[0]) === -1 ? [...b, parameter] : b,
    ),
  )
  const chipPairs = pipe(
    filteredParameters,
    map(([k, v]) => `${k}: ${v}`),
  )

  return {
    initialSelectedFields: pipe(
      filteredParameters,
      map(([k]) => k),
    ),
    initialPreviousChipValue:
      chipPairs.length > 1 ? chipPairs.slice(0, -1) : [],
    initialActiveChipValue: chipPairs.at(-1) ?? "",
  }
}
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
  label,
  fields,
}: useSearchWithRouterProperties) {
  const [searchParameters, setSearchParameters] = useSearchParams()
  const {
    initialSelectedFields,
    initialPreviousChipValue,
    initialActiveChipValue,
  } = getInitialSearchValues(searchParameters, fields)

  // Determines whether the input field is in a state of accepting user input
  const [isAcceptingInput, setIsAcceptingInput] = useState<boolean>(false)
  // Holds the list of field names the user selected from the dropdown
  const [value, setValue] = useState<Array<string>>(initialSelectedFields)
  // Holds the previously created chips (field:value pairs).
  const [previousChipValue, setPreviousChipValue] = useState<string[]>(
    initialPreviousChipValue,
  )
  // Holding the currently active chip's value.
  const [activeChipValue, setActiveChipValue] = useState<string>(
    initialActiveChipValue,
  )
  // Track the current input from the user and a copy of it.
  const [input, setInput] = useState<inputProperties>({
    user: emptyString,
    userCopy: emptyString,
  })

  const filterFields = (options: Array<string>) =>
    isAcceptingInput ? [] : options.filter((o) => !value.includes(o))

  /**
   * Callback that gets fired when one option from dropdown gets selected
   */
  const onChange = (_: any, values: string[], reason: string): void => {
    switch (reason) {
      // Handle when a list option is selected
      case "select-option":
        if (activeChipValue) {
          setPreviousChipValue((state) => [...state, activeChipValue])
          setActiveChipValue(emptyString)
        }
        setIsAcceptingInput(true)
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
    const lastValue = value.at(-1)
    switch (true) {
      // If the event type is not either change or keydown, return.
      case !["change", "keydown"].includes(event.type):
        return
      // If not accepting input return
      case !isAcceptingInput:
        return
      // Setting input value
      case reason === "input":
        setInput({ user: newInputValue, userCopy: newInputValue })
        return
      // Clear inputs and create a chip for the completed field
      default:
        setInput((state) => ({ ...state, user: emptyString }))
        setIsAcceptingInput(false)
        if (lastValue) {
          setActiveChipValue(`${lastValue}: ${input.userCopy}`)
          searchParameters.append(lastValue, input.userCopy)
          setSearchParameters(searchParameters)
        }
    }
  }

  /**
   * Callback when a chip is removed from the search input
   */
  const onDeleteChip = (chipValue: string) => {
    const [optValue] = chipValue.split(":")
    setValue(value.filter((v) => v !== optValue))
    // If chip's value is a part of the URL parameters, delete it
    if (optValue) {
      searchParameters.delete(optValue)
    }
    setSearchParameters(searchParameters)
    // If the chip being deleted is the one that's active, reset activeChipValue
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
    if (isAcceptingInput) {
      return (
        <>
          {previousChipValue.map((o) => (
            <Chip
              onDelete={() => onDeleteChip(o)}
              size="small"
              key={uuid4()}
              label={o}
              color="primary"
              style={{ marginRight: "2px" }}
            />
          ))}
          <FieldOption key={uuid4()} label={`${values.at(-1)}:`} />
        </>
      )
    }
    return [...previousChipValue, activeChipValue]
      .filter((o) => o !== emptyString)
      .map((o) => (
        <Chip
          onDelete={() => onDeleteChip(o)}
          label={o}
          key={uuid4()}
          size="small"
          color="primary"
          style={{ marginRight: "2px" }}
        />
      ))
  }

  /**
   * Callback for rendering the search box
   */
  const renderInput = (parameters: AutocompleteRenderInputParams) => (
    <TextField
      {...parameters}
      value=""
      size="medium"
      label={label}
      variant="outlined"
      fullWidth
    />
  )

  const renderOption = (option: string) => <FieldOption label={option} />

  return {
    isAcceptingInput,
    value,
    input,
    setValue,
    onChange,
    onInputChange,
    renderTags,
    filterFields,
    renderInput,
    renderOption,
  }
}
