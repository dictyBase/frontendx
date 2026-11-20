import { useEffect } from "react"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { deepPurple } from "@mui/material/colors"
import { useSearchParams } from "react-router-dom"

/**
 * The props for {@link FilterDropdown}
 */
export interface FilterDropdownProperties {
  value: string
  param: string
  options: Array<{ value: string; label: string }>
}

/**
 * Displays a dropdown menu of the given items. Selecting any particular item
 * will append its filter parameter in the query parameter of browser's url.
 */
export const FilterDropdown = ({
  param,
  value,
  options,
}: FilterDropdownProperties) => {
  const [searchParameters, setSearchParameters] = useSearchParams()
  const filterValue = pipe(
    searchParameters.get(param),
    OfromNullable,
    OgetOrElse(() => value),
  )

  useEffect(() => {
    setSearchParameters(
      (previousParameters) => {
        const newParameters = new URLSearchParams([
          ...previousParameters.entries(),
        ])
        newParameters.set(param, filterValue)
        return [...newParameters.entries()]
      },
      { replace: true },
    )
  }, [searchParameters, setSearchParameters, param, filterValue, value])

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSearchParameters((previousParameters) => {
      const newParameters = new URLSearchParams([
        ...previousParameters.entries(),
      ])
      newParameters.set(param, event.target.value)
      return [...newParameters.entries()]
    })
  }

  return (
    <FormControl fullWidth variant="outlined">
      <Select
        sx={{
          minWidth: "200px",
          background: "white",
          color: deepPurple[500],
          fontWeight: 200,
          borderStyle: "none",
          boxShadow: "0px 5px 8px -3px rgba(0,0,0,0.14)",
          "&:focus": {
            borderRadius: "12px",
            background: "white",
            borderColor: deepPurple[100],
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "12px",
              marginTop: "8px",
            },
          },
          MenuListProps: {
            sx: {
              paddingTop: 0,
              paddingBottom: 0,
              background: "white",
              "& li": {
                fontWeight: 200,
                paddingTop: "12px",
                paddingBottom: "12px",
              },
              "& li:hover": {
                background: deepPurple[100],
              },
              "& li.Mui-selected": {
                color: "white",
                background: deepPurple[400],
              },
              "& li.Mui-selected:hover": {
                background: deepPurple[500],
              },
            },
          },
        }}
        onChange={handleChange}
        value={filterValue}>
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
