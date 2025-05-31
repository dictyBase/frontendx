import { useState, ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { Eq as SEq } from "fp-ts/string"
import {
  last as Alast,
  map as Amap,
  filter as Afilter,
  reduce as Areduce,
  elem as Aelem,
} from "fp-ts/Array"
import {
  toEntries as RtoEntries,
  filterWithIndex as RfilterWithIndex,
  difference as Rdifference,
} from "fp-ts/Record"
import { map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import {
  FieldOption,
  SearchTerm,
  capitalizeFirstCharacter,
} from "@dictybase/ui-common"
import { useRouter } from "next/router"
import { AutocompleteRenderInputParams } from "@material-ui/lab"
import { TextField } from "@material-ui/core"

interface inputProperties {
  /** user input that gets reset after switching options  */
  user: string
  /** copy of user input that does not gets reset */
  userCopy: string
}

/**
 * Hook that extracts and filters URL search parameters based on provided fields
 *
 * @param fields - Array of field names to filter the URL query parameters
 * @returns A tuple containing the filtered search parameters and a setter function
 */
const useSearchParameters = (fields: Array<string>) => {
  const router = useRouter()
  // `router.query` includes dynamic route parameters which must first be filtered.
  const searchParameters = pipe(
    router.query,
    RfilterWithIndex((k) => pipe(fields, Aelem(SEq)(k))),
  )
  const setSearchParameters = (
    newQuery: Record<string, NonNullable<string | string[] | undefined>>,
  ) => {
    router.replace({
      query: {
        // ...Likewise, the dynamic route parameters must included when setting `router.query`
        ...pipe(router.query, Rdifference(searchParameters)),
        ...newQuery,
      },
    })
  }
  return [searchParameters, setSearchParameters] as [
    Record<string, NonNullable<string | string[] | undefined>>,
    (
      newQuery: Record<string, NonNullable<string | string[] | undefined>>,
    ) => void,
  ]
}

const getActiveOptionLabel = (values: Array<string>) =>
  pipe(
    values,
    Alast,
    Omap(capitalizeFirstCharacter),
    OgetOrElse(() => ""),
  )

const emptyString: Readonly<string> = ""

const getInitialSearchValues = (
  searchParameters: Record<string, NonNullable<string | string[] | undefined>>,
  fields: Array<string>,
) => {
  const filteredParameters = pipe(
    searchParameters,
    RtoEntries,
    Afilter(([k]) => fields.includes(k)),
    Areduce([] as Array<[string, string | Array<string>]>, (b, parameter) =>
      b.findIndex(([k]) => k === parameter[0]) === -1 ? [...b, parameter] : b,
    ),
  )
  const chipPairs = pipe(
    filteredParameters,
    Amap(([k, v]) => `${k}: ${v}`),
  )

  return {
    initialSelectedFields: pipe(
      filteredParameters,
      Amap(([k]) => k),
    ),
    initialPreviousChipValue:
      chipPairs.length > 1 ? chipPairs.slice(0, -1) : [],
    initialActiveChipValue: chipPairs.at(-1) ?? "",
  }
}
/**
 * The prop type for {@link useSearchWithRouter}
 */
interface useSearchWithRouterProperties {
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
function useSearchWithRouter({ label, fields }: useSearchWithRouterProperties) {
  const [searchParameters, setSearchParameters] = useSearchParameters(fields)
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
          setSearchParameters({
            ...searchParameters,
            [lastValue]: input.userCopy,
          })
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
    pipe(
      searchParameters,
      RfilterWithIndex((k) => k !== optValue),
      setSearchParameters,
    )
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
            <SearchTerm
              key={o}
              onDelete={() => onDeleteChip(o)}
              label={capitalizeFirstCharacter(o)}
            />
          ))}
          <FieldOption label={getActiveOptionLabel(values)} />
        </>
      )
    }
    return [...previousChipValue, activeChipValue]
      .filter((o) => o !== emptyString)
      .map((o) => (
        <SearchTerm
          key={o}
          onDelete={() => onDeleteChip(o)}
          label={capitalizeFirstCharacter(o)}
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
      style={{ backgroundColor: "white" }}
      InputLabelProps={{ style: { fontWeight: 700 } }}
      size="medium"
      label={label}
      variant="outlined"
      fullWidth
    />
  )

  const renderOption = (option: string) => (
    <FieldOption label={capitalizeFirstCharacter(option)} />
  )

  return {
    isAcceptingInput,
    value,
    input,
    setValue,
    onChange,
    onInputChange,
    onDeleteChip,
    renderTags,
    renderInput,
    renderOption,
    filterFields,
    activeChipValue,
  }
}

export {
  useSearchParameters,
  useSearchWithRouter,
  getActiveOptionLabel,
  type inputProperties,
  type useSearchWithRouterProperties,
}
