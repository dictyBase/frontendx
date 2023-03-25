import { Autocomplete } from "@material-ui/lab"
import { useSearchWithRouter } from "@dictybase/hook"
import { useSearchParams } from "react-router-dom"

export const defaultLabel = "Search (Click for available fields to serach)"
export const defaultHelp =
  "Select a field, add search text and then press enter for next field"

/**
 * The props for {@link SearchBox}
 */
export interface SearchBoxProps {
  /** The list of fields for searching */
  fields: string[]
  /** The label of input box */
  label?: string
  /** Text that will be displayed below the input */
  help?: string
}

/**
 * Search component with react-router integration. It is based on {@link
 * https://v4.mui.com| material ui's} {@link
 * https://v4.mui.com/components/autocomplete/ | AutoComplete} component.
 */
export function SearchBox({
  fields,
  label = defaultLabel,
  help = defaultHelp,
}: SearchBoxProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    input,
    value,
    onChange,
    onInputChange,
    renderTags,
    filterFields,
    renderInput,
  } = useSearchWithRouter({
    fields,
    label,
    help,
    setSearchParams,
    searchParams,
  })

  return (
    <Autocomplete
      selectOnFocus
      id="controllable-states"
      disableClearable
      freeSolo
      multiple
      options={fields}
      value={value}
      inputValue={input.user}
      filterOptions={filterFields}
      onChange={onChange}
      onInputChange={onInputChange}
      renderTags={renderTags}
      renderInput={renderInput}
    />
  )
}
