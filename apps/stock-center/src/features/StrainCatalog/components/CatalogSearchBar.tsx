import { Box, Button, Chip, Stack, TextField } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { StrainType } from "dicty-graphql-schema"
import type { CatalogFilters } from "../types/catalog"

type CatalogSearchBarProperties = {
  onSearchChange: (filters: CatalogFilters) => void
  filters: CatalogFilters
}

const DEBOUNCE_DELAY = 300

const CatalogSearchBar = ({
  onSearchChange,
  filters,
}: CatalogSearchBarProperties) => {
  const [searchInput, setSearchInput] = useState("")
  const [searchParameters, setSearchParameters] = useSearchParams()
  const navigate = useNavigate()
  const debounceTimerReference = useRef<NodeJS.Timeout>()

  // Initialize from URL query parameter on mount
  useEffect(() => {
    const query = searchParameters.get("q") || ""
    setSearchInput(query)
  }, [searchParameters])

  // Debounced search handler
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value)

      // Clear existing timeout
      if (debounceTimerReference.current) {
        clearTimeout(debounceTimerReference.current)
      }

      // Set new debounce timer
      debounceTimerReference.current = setTimeout(() => {
        // Update URL with search query
        if (value) {
          setSearchParameters((previous) => {
            previous.set("q", value)
            return previous
          })
        } else {
          setSearchParameters((previous) => {
            previous.delete("q")
            return previous
          })
        }

        // Update filters
        onSearchChange({
          ...filters,
          searchQuery: value,
        })
      }, DEBOUNCE_DELAY)
    },
    [filters, onSearchChange, setSearchParameters],
  )

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
    setSearchParameters((previous) => {
      previous.delete("q")
      return previous
    })
    onSearchChange({
      ...filters,
      searchQuery: "",
    })
  }, [filters, onSearchChange, setSearchParameters])

  const handleClearAll = useCallback(() => {
    setSearchInput("")
    setSearchParameters((previous) => {
      previous.delete("q")
      previous.delete("strain-type")
      return previous
    })
    onSearchChange({
      strainType: StrainType.Regular,
      searchQuery: "",
    })
    navigate(".", { replace: true })
  }, [navigate, onSearchChange, setSearchParameters])

  const hasActiveFilters =
    searchInput || filters.strainType !== StrainType.Regular

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
          <TextField
            fullWidth
            placeholder="Search by descriptor or summary"
            value={searchInput}
            onChange={(event) => handleSearchChange(event.target.value)}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "0 16px",
                paddingRight: searchInput ? "44px" : "16px",
                position: "relative",
              },
              "& .MuiOutlinedInput-input": {
                padding: "12px 0",
                fontSize: "15px",
              },
            }}
            InputProps={{
              endAdornment: searchInput ? (
                <Button
                  onClick={handleClearSearch}
                  sx={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    minWidth: "24px",
                    width: "24px",
                    height: "24px",
                    padding: 0,
                    background: "#cbd5e0",
                    color: "white",
                    borderRadius: "50%",
                    "&:hover": {
                      background: "#a0aec0",
                    },
                    fontSize: "16px",
                  }}>
                  ✕
                </Button>
              ) : undefined,
            }}
          />
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
          {filters.strainType !== "REGULAR" && (
            <Chip
              label={`Type: ${filters.strainType}`}
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
