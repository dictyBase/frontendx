import { useState, useEffect, useRef, useCallback } from "react"
import { Box, Typography, Card, CardContent } from "@mui/material"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import {
  StrainType,
  PlasmidType,
  useStrainListQuery,
  usePlasmidListFilterQuery,
} from "dicty-graphql-schema"
import {
  SEARCH_MAX_WIDTH,
  SEARCH_FETCH_POLICY,
  QUERY_LIMIT,
  DISPLAY_LIMIT,
  DEBOUNCE_DELAY_MS,
} from "./types"
import type { NavItem } from "./types"
import { SearchInput } from "./SearchInput"
import { SearchDropdown } from "./SearchDropdown"

const NewHome = () => {
  const [inputValue, setInputValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const anchorReference = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue.trim())
    }, DEBOUNCE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [inputValue])

  const strainResult = useStrainListQuery({
    variables: {
      cursor: 0,
      limit: QUERY_LIMIT,
      filter: { strain_type: StrainType.All, label: searchTerm },
    },
    skip: !searchTerm,
    fetchPolicy: SEARCH_FETCH_POLICY,
  })

  const plasmidResult = usePlasmidListFilterQuery({
    variables: {
      cursor: 0,
      limit: QUERY_LIMIT,
      filter: { plasmid_type: PlasmidType.All, name: searchTerm },
    },
    skip: !searchTerm,
    fetchPolicy: SEARCH_FETCH_POLICY,
  })

  const strains = strainResult.data?.listStrains?.strains ?? []
  const plasmids = plasmidResult.data?.listPlasmids?.plasmids ?? []
  const strainNextCursor = strainResult.data?.listStrains?.nextCursor ?? 0
  const plasmidNextCursor = plasmidResult.data?.listPlasmids?.nextCursor ?? 0

  const visibleStrains = strains.slice(0, DISPLAY_LIMIT)
  const visiblePlasmids = plasmids.slice(0, DISPLAY_LIMIT)

  const hasMoreStrains = strainNextCursor > 0
  const hasMorePlasmids = plasmidNextCursor > 0

  const strainFooterHref = hasMoreStrains
    ? `/strains?descriptor=${encodeURIComponent(searchTerm)}&group=all`
    : "/strains"
  const strainFooterLabel = hasMoreStrains
    ? "See all strain results"
    : "Advanced Strain Search"

  const plasmidFooterHref = hasMorePlasmids
    ? `/plasmids?descriptor=${encodeURIComponent(searchTerm)}&group=all`
    : "/plasmids"
  const plasmidFooterLabel = hasMorePlasmids
    ? "See all plasmid results"
    : "Advanced Plasmid Search"

  const hasResults = strains.length > 0 || plasmids.length > 0
  const isLoading = strainResult.loading || plasmidResult.loading

  const navItems: Array<NavItem> = [
    ...visibleStrains.map(
      (s): NavItem => ({
        type: "strain",
        id: s.id,
        descriptor: s.label,
        summary: s.summary ?? undefined,
        to: `/strains/${s.id}`,
      }),
    ),
    ...(strains.length > 0
      ? [
          {
            type: "strainFooter" as const,
            to: strainFooterHref,
            label: strainFooterLabel,
          },
        ]
      : []),
    ...(strains.length > 0 && plasmids.length > 0
      ? [{ type: "divider" as const }]
      : []),
    ...visiblePlasmids.map(
      (p): NavItem => ({
        type: "plasmid",
        id: p.id,
        descriptor: p.name,
        summary: p.summary ?? undefined,
        to: `/plasmids/${p.id}`,
      }),
    ),
    ...(plasmids.length > 0
      ? [
          {
            type: "plasmidFooter" as const,
            to: plasmidFooterHref,
            label: plasmidFooterLabel,
          },
        ]
      : []),
  ]

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setActiveIndex(-1)
    if (event.target.value.trim().length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
      setSearchTerm("")
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || navItems.length === 0) return

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((previous) => Math.min(previous + 1, navItems.length - 1))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((previous) => Math.max(previous - 1, -1))
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault()
      const item = navItems[activeIndex]
      if (item.type !== "divider") navigate(item.to)
    } else if (event.key === "Escape") {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  const handleClickAway = useCallback(() => {
    setOpen(false)
    setActiveIndex(-1)
  }, [])

  const handleFocus = () => {
    if (searchTerm.length > 0) {
      setOpen(true)
      setActiveIndex(-1)
    }
  }

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

        <SearchInput
          anchorRef={anchorReference}
          inputValue={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onClick={handleFocus}
        />

        <SearchDropdown
          open={open && searchTerm.length > 0}
          anchorEl={anchorReference.current}
          navItems={navItems}
          activeIndex={activeIndex}
          isLoading={isLoading}
          hasResults={hasResults}
          onClickAway={handleClickAway}
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
        {(
          [
            {
              key: "strains",
              icon: "🧬",
              title: "Strain Catalog",
              href: "/strains",
            },
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
        ).map(({ key, icon, title, href }) => (
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
