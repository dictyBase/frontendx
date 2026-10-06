import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { pipe, flow } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import {
  of as Aof,
  map as Amap,
  match as Amatch,
  append as Aappend,
  intersperse as Aintersperse,
  flatten as Aflatten,
} from "fp-ts/Array"
import { match, P } from "ts-pattern"
import {
  StrainType,
  PlasmidType,
  useStrainListQuery,
  usePlasmidListFilterQuery,
  StrainListQuery,
  PlasmidListFilterQuery,
} from "dicty-graphql-schema"
import {
  SEARCH_FETCH_POLICY,
  QUERY_LIMIT,
  DISPLAY_LIMIT,
  DEBOUNCE_DELAY_MS,
} from "./types"
import type { NavItem } from "./types"

type StrainList = NonNullable<StrainListQuery["listStrains"]>["strains"]
type PlasmidList = NonNullable<
  PlasmidListFilterQuery["listPlasmids"]
>["plasmids"]

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
    const { key } = event
    const hasItems = navItems.length > 0

    match({ open, key, hasItems, activeIndex })
      // Escape always closes and resets
      .with({ key: "Escape" }, () => {
        setOpen(false)
        setActiveIndex(-1)
      })
      // Open dropdown from closed state on ArrowDown or Enter
      .with(
        { open: false, key: P.union("ArrowDown", "Enter"), hasItems: true },
        () => {
          event.preventDefault()
          setOpen(true)
          if (key === "ArrowDown") setActiveIndex(0)
        },
      )
      // Arrow navigation when open
      .with({ open: true, key: "ArrowDown", hasItems: true }, () => {
        event.preventDefault()
        setActiveIndex((previous) =>
          Math.min(previous + 1, navItems.length - 1),
        )
      })
      .with({ open: true, key: "ArrowUp", hasItems: true }, () => {
        event.preventDefault()
        setActiveIndex((previous) => Math.max(previous - 1, -1))
      })
      // Enter selects the active item when open
      .with(
        {
          open: true,
          key: "Enter",
          activeIndex: P.when((n: number) => n >= 0),
        },
        () => {
          event.preventDefault()
          const item = navItems[activeIndex]
          if (item.type !== "divider") navigate(item.to)
        },
      )
      .otherwise(() => {})
  }

const toStrainNavItem = (s: {
  id: string
  label: string
  summary?: string | null
}): NavItem => ({
  type: "strain",
  id: s.id,
  descriptor: s.label,
  summary: s.summary ?? undefined,
  to: `/strains/${s.id}`,
})

const toPlasmidNavItem = (p: {
  id: string
  name: string
  summary?: string | null
}): NavItem => ({
  type: "plasmid",
  id: p.id,
  descriptor: p.name,
  summary: p.summary ?? undefined,
  to: `/plasmids/${p.id}`,
})

const buildNavItems = (
  visibleStrains: Array<Parameters<typeof toStrainNavItem>[0]>,
  visiblePlasmids: Array<Parameters<typeof toPlasmidNavItem>[0]>,
  strainFooterHref: string,
  strainFooterLabel: string,
  plasmidFooterHref: string,
  plasmidFooterLabel: string,
): Array<NavItem> => {
  const strainItemsWithFooter = pipe(
    visibleStrains,
    Amap(toStrainNavItem),
    Amatch(
      () => [] as Array<NavItem>,
      flow(
        Aappend({
          type: "strainFooter" as const,
          to: strainFooterHref,
          label: strainFooterLabel,
        } as NavItem),
      ),
    ),
  )
  const plasmidItemsWithFooter = pipe(
    visiblePlasmids,
    Amap(toPlasmidNavItem),
    Amatch(
      () => [] as Array<NavItem>,
      flow(
        Aappend({
          type: "plasmidFooter" as const,
          to: plasmidFooterHref,
          label: plasmidFooterLabel,
        } as NavItem),
      ),
    ),
  )
  // Insert divider between strain and plasmid items.
  return pipe(
    Aof(strainItemsWithFooter),
    Aappend(plasmidItemsWithFooter),
    Aintersperse([{ type: "divider" as const }] as Array<NavItem>),
    Aflatten,
  )
}

const useCatalogSearch = () => {
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

  const strainsList = pipe(
    strainResult.data,
    OfromNullable,
    OflatMap(({ listStrains }) => OfromNullable(listStrains)),
    Omap(({ strains }) => strains),
    OgetOrElse(() => [] as StrainList),
  )
  const plasmidsList = pipe(
    plasmidResult.data,
    OfromNullable,
    OflatMap(({ listPlasmids }) => OfromNullable(listPlasmids)),
    Omap(({ plasmids }) => plasmids),
    OgetOrElse(() => [] as PlasmidList),
  )

  const visibleStrains = strainsList.slice(0, DISPLAY_LIMIT)
  const visiblePlasmids = plasmidsList.slice(0, DISPLAY_LIMIT)

  const hasMoreStrains = strainsList.length > DISPLAY_LIMIT
  const hasMorePlasmids = plasmidsList.length > DISPLAY_LIMIT

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
    hasResults: strainsList.length > 0 || plasmidsList.length > 0,
    handleInputChange,
    handleKeyDown,
    handleClickAway,
    handleFocus,
  }
}

export { useCatalogSearch }
