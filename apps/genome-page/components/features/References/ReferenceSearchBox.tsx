import { Autocomplete } from "@material-ui/lab"
import { useSearchWithRouter } from "./useSearchWithRouter"

export const defaultLabel = "Search (Click for available fields to search)"
export const defaultHelp =
  "Select a field, add search text and then press enter for next field"

/**
 * The props for {@link ReferencesSearchBox}
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
const ReferencesSearchBox = ({
  fields,
  label = defaultLabel,
  help = defaultHelp,
}: SearchBoxProperties) => {
  const {
    input,
    value,
    onChange,
    onInputChange,
    renderTags,
    filterFields,
    renderInput,
    renderOption,
  } = useSearchWithRouter({
    fields,
    label,
    help,
  })

  return (
    <Autocomplete
      disableClearable
      freeSolo
      multiple
      selectOnFocus
      id="controllable-states"
      value={value}
      inputValue={input.user}
      options={fields}
      filterOptions={filterFields}
      onChange={onChange}
      onInputChange={onInputChange}
      renderTags={renderTags}
      renderInput={renderInput}
      renderOption={renderOption}
    />
  )
}

export { ReferencesSearchBox }
