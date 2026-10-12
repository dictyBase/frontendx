import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { pipe, flow } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import {
  of as Aof,
  map as Amap,
  match as Amatch,
  append as Aappend,
  filter as Afilter,
  intersperse as Aintersperse,
  flatten as Aflatten,
  isNonEmpty as AisNonEmpty,
} from "fp-ts/Array"
import { match, P } from "ts-pattern"
import {
  StockEntityType,
  useListStockSuggestionsLazyQuery,
  ListStockSuggestionsQuery,
} from "dicty-graphql-schema"
import {
  SEARCH_FETCH_POLICY,
  QUERY_LIMIT,
  DISPLAY_LIMIT,
  DEBOUNCE_DELAY_MS,
  MIN_CHARS,
} from "./types"
import type { NavItem } from "./types"

/**
 * A normalized suggestion item derived from a `listStockSuggestions` query result.
 * Only the fields required for rendering a dropdown entry are included.
 */
type SuggestionItem = {
  id: string
  display_text: string
}

/**
 * The full `suggestions` array type from the `listStockSuggestions` lazy query result.
 */
type SuggestionList = NonNullable<
  ListStockSuggestionsQuery["listStockSuggestions"]
>["suggestions"]

type KeyDownDeps = {
  open: boolean
  setOpen: (value: boolean) => void
  activeIndex: number
  setActiveIndex: (value: number | ((previous: number) => number)) => void
  navItems: Array<NavItem>
  navigate: ReturnType<typeof useNavigate>
}

/**
 * Creates a keyboard-event handler for the search input that manages
 * dropdown open state, arrow-key navigation, Enter-to-navigate, and Escape-to-close.
 *
 * @param deps - State refs and setters needed to drive the dropdown.
 * @returns A `React.KeyboardEvent` handler for an `<input>` element.
 */
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

/**
 * Converts a stock suggestion into a strain `NavItem` for the search dropdown.
 *
 * @param s - Suggestion item with `id` and `display_text`.
 * @returns A `NavItem` of type `"strain"`.
 */
const toStrainNavItem = (s: SuggestionItem): NavItem => ({
  type: "strain",
  id: s.id,
  descriptor: s.display_text,
  summary: undefined,
  to: `/strains/${s.id}`,
})

/**
 * Converts a stock suggestion into a plasmid `NavItem` for the search dropdown.
 *
 * @param p - Suggestion item with `id` and `display_text`.
 * @returns A `NavItem` of type `"plasmid"`.
 */
const toPlasmidNavItem = (p: SuggestionItem): NavItem => ({
  type: "plasmid",
  id: p.id,
  descriptor: p.display_text,
  summary: undefined,
  to: `/plasmids/${p.id}`,
})

/**
 * Builds the ordered list of `NavItem`s for the search dropdown.
 *
 * Each non-empty section (strains, plasmids) gets a typed footer link appended.
 * A divider is inserted between the two sections only when both are non-empty.
 *
 * @param visibleStrains - Strain suggestion items to display (pre-sliced to display limit).
 * @param visiblePlasmids - Plasmid suggestion items to display (pre-sliced to display limit).
 * @param strainFooterHref - `href` for the strain section footer link.
 * @param strainFooterLabel - Label text for the strain section footer link.
 * @param plasmidFooterHref - `href` for the plasmid section footer link.
 * @param plasmidFooterLabel - Label text for the plasmid section footer link.
 * @returns An ordered array of `NavItem`s ready for rendering.
 */
const buildNavItems = (
  visibleStrains: Array<SuggestionItem>,
  visiblePlasmids: Array<SuggestionItem>,
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
  // Only insert a divider between two non-empty sides.
  return pipe(
    Aof(strainItemsWithFooter),
    Aappend(plasmidItemsWithFooter),
    Afilter(AisNonEmpty),
    Aintersperse([{ type: "divider" as const }] as Array<NavItem>),
    Aflatten,
  )
}

/**
 * Drives the general search UI: input state, debounced querying via
 * `listStockSuggestions` (triggered only when the trimmed input reaches
 * `MIN_CHARS` characters), dropdown open/close, and keyboard navigation.
 *
 * @returns State values and event handlers consumed by `GeneralSearch`.
 */
const useComprehensiveSearch = () => {
  const [inputValue, setInputValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const navigate = useNavigate()

  const [fetchSuggestions, { data, loading }] =
    useListStockSuggestionsLazyQuery({ fetchPolicy: SEARCH_FETCH_POLICY })

  // Debounce: propagate trimmed input to searchTerm after a short delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue.trim())
    }, DEBOUNCE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [inputValue])

  // Fire the lazy query only once the search term meets the minimum length.
  useEffect(() => {
    if (searchTerm.length >= MIN_CHARS) {
      fetchSuggestions({
        variables: { query: searchTerm, limit: QUERY_LIMIT },
      })
    }
  }, [searchTerm, fetchSuggestions])

  const suggestions: SuggestionList = pipe(
    data,
    OfromNullable,
    Omap(({ listStockSuggestions }) => listStockSuggestions.suggestions),
    OgetOrElse(() => [] as SuggestionList),
  )

  const strainSuggestions = pipe(
    suggestions,
    Afilter((s) => s.entity === StockEntityType.Strain),
  )
  const plasmidSuggestions = pipe(
    suggestions,
    Afilter((s) => s.entity === StockEntityType.Plasmid),
  )

  const visibleStrains = strainSuggestions.slice(0, DISPLAY_LIMIT)
  const visiblePlasmids = plasmidSuggestions.slice(0, DISPLAY_LIMIT)

  const hasMoreStrains = strainSuggestions.length > DISPLAY_LIMIT
  const hasMorePlasmids = plasmidSuggestions.length > DISPLAY_LIMIT

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
    const { value } = event.target
    setInputValue(value)
    setActiveIndex(-1)
    if (value.trim().length >= MIN_CHARS) {
      setOpen(true)
    } else {
      setOpen(false)
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
    if (searchTerm.length >= MIN_CHARS) {
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
    isLoading: loading,
    hasResults: suggestions.length > 0,
    handleInputChange,
    handleKeyDown,
    handleClickAway,
    handleFocus,
  }
}

export { useComprehensiveSearch, buildNavItems }
export type { SuggestionItem }
