import { Box, Stack } from "@mui/material"
import { searchFields } from "@dictybase/hook-dsc"
import { SearchBox } from "@dictybase/ui-dsc"

// const DEBOUNCE_DELAY = 300

const CatalogSearchBar = () => (
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
      </Stack>
    </Box>
  </Box>
)

export { CatalogSearchBar }
