import { useRef } from "react"
import { Box, Typography, ClickAwayListener } from "@mui/material"
import { SEARCH_MAX_WIDTH } from "./types"
import { SearchInput } from "./SearchInput"
import { SearchDropdown } from "./SearchDropdown"
import { useHomeSearch } from "./useHomeSearch"

const GeneralSearch = () => {
  const anchorReference = useRef<HTMLDivElement>(null)
  const {
    inputValue,
    searchTerm,
    open,
    activeIndex,
    navItems,
    isLoading,
    hasResults,
    handleInputChange,
    handleKeyDown,
    handleClickAway,
    handleFocus,
  } = useHomeSearch()
  return (
    <Box sx={{ width: "100%", maxWidth: SEARCH_MAX_WIDTH }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1rem", md: "1.1rem" },
          fontWeight: 600,
          color: "#718096",
          textAlign: "center",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          mb: 1,
        }}>
        Dicty Stock Center
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2rem", md: "2.75rem" },
          fontWeight: 800,
          color: "#1a202c",
          textAlign: "center",
          letterSpacing: "-0.5px",
          mb: 2,
        }}>
        Explore the Catalog
      </Typography>
      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "#718096",
          textAlign: "center",
          lineHeight: 1.7,
          mb: 4,
        }}>
        A rapidly growing central repository for{" "}
        <em>Dictyostelium discoideum</em> strains and those of related species,
        plasmids, commonly used food bacteria, and other materials such as
        antibodies.
      </Typography>

      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <SearchInput
            anchorRef={anchorReference}
            inputValue={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
          />

          <SearchDropdown
            open={open && searchTerm.length > 0}
            anchorEl={anchorReference.current}
            navItems={navItems}
            activeIndex={activeIndex}
            isLoading={isLoading}
            hasResults={hasResults}
            searchTerm={searchTerm}
          />
        </Box>
      </ClickAwayListener>

      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}
      />
    </Box>
  )
}

export { GeneralSearch }
