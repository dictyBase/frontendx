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

export type { NavItem }
export {
  SEARCH_MAX_WIDTH,
  DEBOUNCE_DELAY_MS,
  SEARCH_FETCH_POLICY,
  QUERY_LIMIT,
  DISPLAY_LIMIT,
  STRAIN_COLOR,
  STRAIN_BG,
  PLASMID_COLOR,
  PLASMID_BG,
  ACTIVE_BG,
}
