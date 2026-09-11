import { useState, useEffect, useRef, useCallback } from "react"
import {
  Box,
  Typography,
  InputBase,
  Paper,
  Divider,
  Popper,
  ClickAwayListener,
} from "@mui/material"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import { match } from "ts-pattern"
import {
  StrainType,
  PlasmidType,
  useStrainListQuery,
  usePlasmidListFilterQuery,
} from "dicty-graphql-schema"

const SEARCH_MAX_WIDTH = "760px"
const DEBOUNCE_DELAY_MS = 400
const SEARCH_FETCH_POLICY = "no-cache" as const
const QUERY_LIMIT = 5
const DISPLAY_LIMIT = 4

const STRAIN_COLOR = "#2b6cb0"
const STRAIN_BG = "#ebf8ff"
const PLASMID_COLOR = "#276749"
const PLASMID_BG = "#f0fff4"

const ACTIVE_BG = "#edf2f7"

type TypeLabelProperties = {
  kind: "strain" | "plasmid"
}

const TypeLabel = ({ kind }: TypeLabelProperties) => (
  <Box
    component="span"
    sx={{
      flexShrink: 0,
      fontSize: "0.65rem",
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      px: "6px",
      py: "2px",
      borderRadius: "4px",
      color: kind === "strain" ? STRAIN_COLOR : PLASMID_COLOR,
      backgroundColor: kind === "strain" ? STRAIN_BG : PLASMID_BG,
      border: `1px solid ${kind === "strain" ? "#bee3f8" : "#c6f6d5"}`,
      lineHeight: 1.4,
    }}>
    {kind}
  </Box>
)

type ResultItemProperties = {
  id: string
  descriptor: string
  summary: string | undefined
  path: string
  kind: "strain" | "plasmid"
  isActive: boolean
}

const ResultItem = ({
  id,
  descriptor,
  summary,
  path,
  kind,
  isActive,
}: ResultItemProperties) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      gap: 1.5,
      px: 2,
      py: 1.5,
      borderBottom: "1px solid #edf2f7",
      backgroundColor: isActive ? ACTIVE_BG : "transparent",
      "&:last-child": { borderBottom: "none" },
      "&:hover": { backgroundColor: "#f7fafc" },
    }}>
    <Box sx={{ pt: "2px" }}>
      <TypeLabel kind={kind} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Box
        component={RouterLink}
        to={`/${path}/${id}`}
        sx={{
          display: "block",
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#2b4acb",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
          wordBreak: "break-word",
        }}>
        {descriptor}
      </Box>
      {summary && (
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#718096",
            mt: 0.25,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}>
          {summary}
        </Typography>
      )}
    </Box>
  </Box>
)

type ResultFooterLinkProperties = {
  to: string
  label: string
  isActive: boolean
}

const ResultFooterLink = ({
  to,
  label,
  isActive,
}: ResultFooterLinkProperties) => (
  <Box sx={{ borderTop: "1px solid #edf2f7" }}>
    <Box
      component={RouterLink}
      to={to}
      sx={{
        display: "block",
        px: 2,
        py: 1.25,
        fontSize: "0.8rem",
        fontWeight: 600,
        color: isActive ? "#1a56db" : "#3182ce",
        textDecoration: "none",
        backgroundColor: isActive ? ACTIVE_BG : "transparent",
        "&:hover": { backgroundColor: "#f7fafc", color: "#2b6cb0" },
      }}>
      {label}
    </Box>
  </Box>
)

type NavItem =
  | {
      type: "strain"
      id: string
      descriptor: string
      summary: string | undefined
      to: string
    }
  | {
      type: "plasmid"
      id: string
      descriptor: string
      summary: string | undefined
      to: string
    }
  | { type: "strainFooter"; to: string; label: string }
  | { type: "plasmidFooter"; to: string; label: string }
  | { type: "divider" }

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

        <ClickAwayListener onClickAway={handleClickAway}>
          <Box>
            <Paper
              ref={anchorReference}
              onClick={handleFocus}
              elevation={2}
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "12px",
                height: 70,
                px: 2,
                py: 0.5,
              }}>
              <SearchIcon sx={{ color: "#a0aec0", ml: 1, mr: 0.5 }} />
              <InputBase
                fullWidth
                placeholder="Search strains and plasmids"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                sx={{ fontSize: "1.25rem", py: 0.5 }}
                inputProps={{ "aria-label": "search strains and plasmids" }}
              />
            </Paper>

            <Popper
              open={open && searchTerm.length > 0}
              anchorEl={anchorReference.current}
              placement="bottom-start"
              style={{
                width: anchorReference.current?.offsetWidth,
                zIndex: 1300,
              }}
              modifiers={[{ name: "offset", options: { offset: [0, 4] } }]}>
              <Paper
                elevation={8}
                sx={{ borderRadius: "12px", overflow: "hidden" }}>
                {match({ isLoading, hasResults })
                  .with({ isLoading: true }, () => (
                    <Box sx={{ textAlign: "center", py: 3 }}>
                      <Typography
                        sx={{ fontSize: "0.875rem", color: "#718096" }}>
                        Searching...
                      </Typography>
                    </Box>
                  ))
                  .with({ hasResults: true }, () => (
                    <>
                      {navItems.map((item, index) =>
                        match(item)
                          .with({ type: "strain" }, (s) => (
                            <ResultItem
                              key={s.id}
                              id={s.id}
                              descriptor={s.descriptor}
                              summary={s.summary}
                              path="strains"
                              kind="strain"
                              isActive={activeIndex === index}
                            />
                          ))
                          .with({ type: "plasmid" }, (p) => (
                            <ResultItem
                              key={p.id}
                              id={p.id}
                              descriptor={p.descriptor}
                              summary={p.summary}
                              path="plasmids"
                              kind="plasmid"
                              isActive={activeIndex === index}
                            />
                          ))
                          .with({ type: "strainFooter" }, (f) => (
                            <ResultFooterLink
                              key="strain-footer"
                              to={f.to}
                              label={f.label}
                              isActive={activeIndex === index}
                            />
                          ))
                          .with({ type: "plasmidFooter" }, (f) => (
                            <ResultFooterLink
                              key="plasmid-footer"
                              to={f.to}
                              label={f.label}
                              isActive={activeIndex === index}
                            />
                          ))
                          .with({ type: "divider" }, () => (
                            <Divider key="divider" />
                          ))
                          .exhaustive(),
                      )}
                    </>
                  ))
                  .otherwise(() => undefined)}
              </Paper>
            </Popper>
          </Box>
        </ClickAwayListener>
      </Box>
    </Box>
  )
}

export { NewHome }
