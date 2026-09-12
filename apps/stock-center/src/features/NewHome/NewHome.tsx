import { useRef } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  ClickAwayListener,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { SEARCH_MAX_WIDTH } from "./types"
import { SearchInput } from "./SearchInput"
import { SearchDropdown } from "./SearchDropdown"
import { useHomeSearch } from "./useHomeSearch"

const catalogCards = [
  { key: "strains", icon: "🧬", title: "Strain Catalog", href: "/strains" },
  {
    key: "plasmids",
    icon: "🧪",
    title: "Plasmid Catalog",
    href: "/plasmids",
  },
  {
    key: "phenotypes",
    icon: "🔬",
    title: "Phenotype Search",
    href: "/phenotypes",
  },
] as const

const NewHome = () => {
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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 12,
        px: 3,
        pb: 8,
      }}>
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
          <em>Dictyostelium discoideum</em> strains and those of related
          species, plasmids, commonly used food bacteria, and other materials
          such as antibodies.
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

      <Box
        sx={{
          width: "100%",
          maxWidth: "1100px",
          mt: 10,
          display: "flex",
          alignItems: "stretch",
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
        {catalogCards.map(({ key, icon, title, href }) => (
          <Card
            key={key}
            elevation={0}
            sx={{
              flex: "1 1 240px",
              maxWidth: 320,
              borderRadius: "16px",
              border: "2px solid transparent",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                borderColor: "#004080",
              },
            }}>
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                p: 4,
                "&:last-child": { pb: 4 },
              }}>
              <Typography sx={{ fontSize: "3rem", lineHeight: 1 }}>
                {icon}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#1a202c",
                  textAlign: "center",
                }}>
                {title}
              </Typography>
              <Box
                component={RouterLink}
                to={href}
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#3182ce",
                  textDecoration: "none",
                  "&:hover": { color: "#1a56db" },
                }}>
                Explore →
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export { NewHome }
