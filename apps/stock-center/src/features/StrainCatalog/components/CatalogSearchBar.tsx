import { Box, Button, Chip, Stack } from "@mui/material"
import { searchFields } from "@dictybase/hook-dsc"
import { SearchBox } from "@dictybase/ui-dsc"
import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { fromNullable, getOrElse } from "fp-ts/Option"

// const DEBOUNCE_DELAY = 300

const CatalogSearchBar = () => {
  const [searchInput, setSearchInput] = useState("")
  const [searchParameters, setSearchParameters] = useSearchParams()
  const navigate = useNavigate()
  const debounceTimerReference = useRef<NodeJS.Timeout>()

  // Initialize from URL query parameter on mount using Option
  useEffect(() => {
    const query = pipe(
      searchParameters.get("q"),
      fromNullable,
      getOrElse(() => ""),
    )
    setSearchInput(query)
  }, [searchParameters])

  // Debounced search handler using functional approach
  // const handleSearchChange = useCallback(
  //   (value: string) => {
  //     setSearchInput(value)
  //
  //     // Clear existing timeout using Option
  //     pipe(
  //       debounceTimerReference.current,
  //       fromNullable,
  //       getOrElse(() => undefined as NodeJS.Timeout | undefined),
  //       (timer) => timer && clearTimeout(timer),
  //     )
  //
  //     // Set new debounce timer
  //     debounceTimerReference.current = setTimeout(() => {
  //       setSearchParameters((previous) =>
  //         value
  //           ? pipe(previous, (parameters) => {
  //               parameters.set("q", value)
  //               return parameters
  //             })
  //           : pipe(previous, (parameters) => {
  //               parameters.delete("q")
  //               return parameters
  //             }),
  //       )
  //     }, DEBOUNCE_DELAY)
  //   },
  //   [setSearchParameters],
  // )

  // Cleanup debounce on unmount
  useEffect(
    () => () => {
      if (debounceTimerReference.current) {
        clearTimeout(debounceTimerReference.current)
      }
    },
    [],
  )

  const handleClearSearch = useCallback(() => {
    setSearchInput("")
    setSearchParameters((previous) =>
      pipe(previous, (parameters) => {
        parameters.delete("q")
        return parameters
      }),
    )
  }, [setSearchParameters])

  const handleClearAll = useCallback(() => {
    setSearchInput("")
    setSearchParameters((previous) =>
      pipe(previous, (parameters) => {
        parameters.delete("q")
        parameters.delete("type")
        return parameters
      }),
    )
    navigate(".", { replace: true })
  }, [navigate, setSearchParameters])

  const strainType = pipe(
    searchParameters.get("type"),
    fromNullable,
    getOrElse(() => "REGULAR"),
  )

  const hasActiveFilters = searchInput || strainType !== "REGULAR"

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "20px 24px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}>
      {/* Search Section */}
      <Box sx={{ marginBottom: "16px" }}>
        <Box
          component="label"
          sx={{
            display: "block",
            fontSize: "13px",
            fontWeight: 600,
            color: "#4a5568",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}>
          Search
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <SearchBox fields={searchFields} />
          {hasActiveFilters && (
            <Button
              onClick={handleClearAll}
              variant="outlined"
              sx={{
                padding: "12px 20px",
                border: "2px solid #e53e3e",
                color: "#e53e3e",
                fontWeight: 600,
                fontSize: "13px",
                whiteSpace: "nowrap",
                "&:hover": {
                  background: "#e53e3e",
                  color: "white",
                  borderColor: "#e53e3e",
                },
              }}>
              Clear All
            </Button>
          )}
        </Stack>
      </Box>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid #e2e8f0",
          }}>
          {searchInput && (
            <Chip
              label={`Search: ${searchInput}`}
              onDelete={handleClearSearch}
              sx={{
                background: "#3182ce",
                color: "white",
                padding: "6px 12px",
                fontSize: "13px",
                fontWeight: 500,
                "& .MuiChip-deleteIcon": {
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    color: "white",
                  },
                },
              }}
            />
          )}
          {strainType !== "REGULAR" && (
            <Chip
              label={`Type: ${strainType}`}
              sx={{
                background: "#3182ce",
                color: "white",
                padding: "6px 12px",
                fontSize: "13px",
                fontWeight: 500,
              }}
            />
          )}
        </Box>
      )}
    </Box>
  )
}

export { CatalogSearchBar }
