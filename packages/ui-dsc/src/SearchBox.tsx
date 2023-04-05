import { Autocomplete } from "@material-ui/lab"
import { useSearchParams } from "react-router-dom"
import { useSearchWithRouter } from "@dictybase/hook"

export const defaultLabel = "Search (Click for available fields to serach)"
export const defaultHelp =
  "Select a field, add search text and then press enter for next field"

/**
 * The props for {@link SearchBox}
 */
export interface SearchBoxProperties {
  /** The list of fields for searching */
  fields: string[]
  /** The label of input box */
  label?: string
  /** The help text displayed below the input to guide the user */
  help?: string
}

/**
 * Search component with react-router integration. It is based on {@link
 * https://v4.mui.com| material ui's} {@link
 * https://v4.mui.com/components/autocomplete/ | AutoComplete} component.
 */
export const SearchBox = ({
  fields,
  label = defaultLabel,
  help = defaultHelp,
}: SearchBoxProperties) => {
  const [searchParameters, setSearchParameters] = useSearchParams()
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
    setSearchParameters,
    searchParameters,
  })

  return (
    <Autocomplete
      disableClearable
      filterOptions={filterFields}
      freeSolo
      id="controllable-states"
      inputValue={input.user}
      multiple
      onChange={onChange}
      onInputChange={onInputChange}
      options={fields}
      renderTags={renderTags}
      renderInput={renderInput}
      selectOnFocus
      value={value}
    />
  )
}
