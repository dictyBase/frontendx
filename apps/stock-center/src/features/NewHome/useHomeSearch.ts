import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import {
  StrainType,
  PlasmidType,
  useStrainListQuery,
  usePlasmidListFilterQuery,
} from "dicty-graphql-schema"
import {
  SEARCH_FETCH_POLICY,
  QUERY_LIMIT,
  DISPLAY_LIMIT,
  DEBOUNCE_DELAY_MS,
} from "./types"
import type { NavItem } from "./types"

type KeyDownDeps = {
  open: boolean
  setOpen: (value: boolean) => void
  activeIndex: number
  setActiveIndex: (value: number | ((previous: number) => number)) => void
  navItems: Array<NavItem>
  navigate: ReturnType<typeof useNavigate>
}

const createKeyDownHandler =
  ({
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    navItems,
    navigate,
  }: KeyDownDeps) =>
  (event: React.KeyboardEvent<HTMLInputElement>) => {
    const wantsToOpen =
      (event.key === "ArrowDown" || event.key === "Enter") && !open

    if (wantsToOpen && navItems.length > 0) {
      event.preventDefault()
      setOpen(true)
      if (event.key === "ArrowDown") setActiveIndex(0)
      return
    }

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

const buildNavItems = (
  visibleStrains: Array<{ id: string; label: string; summary?: string | null }>,
  visiblePlasmids: Array<{ id: string; name: string; summary?: string | null }>,
  strainsHaveResults: boolean,
  plasmidsHaveResults: boolean,
  strainFooterHref: string,
  strainFooterLabel: string,
  plasmidFooterHref: string,
  plasmidFooterLabel: string,
): Array<NavItem> => [
  ...visibleStrains.map(
    (s): NavItem => ({
      type: "strain",
      id: s.id,
      descriptor: s.label,
      summary: s.summary ?? undefined,
      to: `/strains/${s.id}`,
    }),
  ),
  ...(strainsHaveResults
    ? [
        {
          type: "strainFooter" as const,
          to: strainFooterHref,
          label: strainFooterLabel,
        },
      ]
    : []),
  ...(strainsHaveResults && plasmidsHaveResults
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
  ...(plasmidsHaveResults
    ? [
        {
          type: "plasmidFooter" as const,
          to: plasmidFooterHref,
          label: plasmidFooterLabel,
        },
      ]
    : []),
]

const useHomeSearch = () => {
  const [inputValue, setInputValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
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

  const navItems: Array<NavItem> = buildNavItems(
    visibleStrains,
    visiblePlasmids,
    strains.length > 0,
    plasmids.length > 0,
    strainFooterHref,
    strainFooterLabel,
    plasmidFooterHref,
    plasmidFooterLabel,
  )

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

  const handleKeyDown = createKeyDownHandler({
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    navItems,
    navigate,
  })

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

  return {
    inputValue,
    searchTerm,
    open,
    activeIndex,
    navItems,
    isLoading: strainResult.loading || plasmidResult.loading,
    hasResults: strains.length > 0 || plasmids.length > 0,
    handleInputChange,
    handleKeyDown,
    handleClickAway,
    handleFocus,
  }
}

export { useHomeSearch }
