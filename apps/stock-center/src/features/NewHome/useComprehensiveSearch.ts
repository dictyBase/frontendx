import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import {
  of as Aof,
  map as Amap,
  append as Aappend,
  filter as Afilter,
  flatten as Aflatten,
  isNonEmpty as AisNonEmpty,
} from "fp-ts/Array"
import { match as Bmatch } from "fp-ts/boolean"
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
  inputValue: string
}

/**
 * Creates a keyboard-event handler for the search input that manages
 * dropdown open state, arrow-key navigation, Enter-to-navigate, Escape-to-close,
 * and catalog navigation when Enter is pressed with 3+ characters and no item
 * highlighted.
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
    inputValue,
  }: KeyDownDeps) =>
  (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    const hasItems = navItems.length > 0

    const trimmed = inputValue.trim()

    match({ open, key, hasItems, activeIndex })
      .with({ key: "Escape" }, () => {
        setOpen(false)
        setActiveIndex(-1)
      })
      .with({ open: false, key: "ArrowDown", hasItems: true }, () => {
        event.preventDefault()
        setOpen(true)
        setActiveIndex(0)
      })
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
      .with({ key: "Enter" }, () => {
        if (trimmed.length >= MIN_CHARS) {
          event.preventDefault()
          setOpen(false)
          setActiveIndex(-1)
          navigate(`/catalog?q=${encodeURIComponent(trimmed)}`)
        }
      })
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
 * Builds the strain and plasmid sections of the search dropdown `NavItem` list.
 *
 * A divider is inserted between the two sections only when both are non-empty.
 * No per-section footer links are added here; the caller is responsible for
 * appending a single unified footer after calling this function.
 *
 * @param visibleStrains - Strain suggestion items to display (pre-sliced to display limit).
 * @param visiblePlasmids - Plasmid suggestion items to display (pre-sliced to display limit).
 * @returns An ordered array of strain/divider/plasmid `NavItem`s ready for rendering.
 */
const buildNavItems = (
  visibleStrains: Array<SuggestionItem>,
  visiblePlasmids: Array<SuggestionItem>,
): Array<NavItem> => {
  const strainItems = pipe(visibleStrains, Amap(toStrainNavItem))
  const plasmidItems = pipe(visiblePlasmids, Amap(toPlasmidNavItem))
  return pipe(
    Aof(strainItems),
    Aappend(plasmidItems),
    Afilter(AisNonEmpty),
    Aflatten,
  )
}

/**
 * Drives the general search UI: input state, debounced querying via
 * `listStockSuggestions` (triggered only when the trimmed input reaches
 * `MIN_CHARS` characters), dropdown open/close, and keyboard navigation.
 *
 * A single "See all search results" `catalogFooter` is appended to the nav
 * items whenever there are visible results, linking to `/catalog` pre-filled
 * with the current search term.
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

  const baseNavItems = buildNavItems(visibleStrains, visiblePlasmids)

  const navItems: Array<NavItem> = pipe(
    baseNavItems.length > 0,
    Bmatch(
      () => baseNavItems,
      () =>
        pipe(
          baseNavItems,
          Aappend({
            type: "catalogFooter" as const,
            to: `/catalog?q=${encodeURIComponent(searchTerm)}`,
            label: "See all search results",
          } as NavItem),
        ),
    ),
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
    inputValue,
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

  const handleSearch = () => {
    const query = inputValue.trim()
    if (query.length < MIN_CHARS) return
    setOpen(false)
    navigate(`/catalog?q=${encodeURIComponent(query)}`)
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
    handleSearch,
  }
}

export { useComprehensiveSearch, buildNavItems }
export type { SuggestionItem }
