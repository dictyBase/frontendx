import { useState, useEffect } from "react"
import { Box, Typography, InputBase, Paper, Divider } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
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
}

const ResultItem = ({
  id,
  descriptor,
  summary,
  path,
  kind,
}: ResultItemProperties) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      gap: 1.5,
      px: 2,
      py: 1.5,
      borderBottom: "1px solid #edf2f7",
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
}

const ResultFooterLink = ({ to, label }: ResultFooterLinkProperties) => (
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
        color: "#3182ce",
        textDecoration: "none",
        "&:hover": { backgroundColor: "#f7fafc", color: "#2b6cb0" },
      }}>
      {label}
    </Box>
  </Box>
)

const NewHome = () => {
  const [inputValue, setInputValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

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

        <Paper
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
            onChange={(event) => setInputValue(event.target.value)}
            sx={{ fontSize: "1.25rem", py: 0.5 }}
            inputProps={{ "aria-label": "search strains and plasmids" }}
          />
        </Paper>

        {match({ searchTerm, isLoading, hasResults })
          .when(
            ({ searchTerm: t, isLoading: l }) => t.length > 0 && l,
            () => (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography sx={{ fontSize: "0.875rem", color: "#718096" }}>
                  Searching...
                </Typography>
              </Box>
            ),
          )
          .when(
            ({ searchTerm: t, isLoading: l, hasResults: r }) =>
              t.length > 0 && !l && r,
            () => (
              <Paper
                elevation={2}
                sx={{ mt: 1.5, borderRadius: "12px", overflow: "hidden" }}>
                {visibleStrains.map((strain) => (
                  <ResultItem
                    key={strain.id}
                    id={strain.id}
                    descriptor={strain.label}
                    summary={strain.summary ?? undefined}
                    path="strains"
                    kind="strain"
                  />
                ))}
                {strains.length > 0 && (
                  <ResultFooterLink
                    to={strainFooterHref}
                    label={strainFooterLabel}
                  />
                )}
                {strains.length > 0 && plasmids.length > 0 && <Divider />}
                {visiblePlasmids.map((plasmid) => (
                  <ResultItem
                    key={plasmid.id}
                    id={plasmid.id}
                    descriptor={plasmid.name}
                    summary={plasmid.summary ?? undefined}
                    path="plasmids"
                    kind="plasmid"
                  />
                ))}
                {plasmids.length > 0 && (
                  <ResultFooterLink
                    to={plasmidFooterHref}
                    label={plasmidFooterLabel}
                  />
                )}
              </Paper>
            ),
          )
          .otherwise(() => undefined)}
      </Box>
    </Box>
  )
}

export { NewHome }
