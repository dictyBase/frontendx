import type { ChipProps } from "@mui/material"

const mockSearchTermPropsArray: ChipProps[] = [
  {
    label: "search term",
    onDelete: () => {},
  },
  {
    label: "filter: active",
  },
  {
    label: "tag",
    onDelete: () => {},
    icon: <span>🏷️</span>,
  },
]

export { mockSearchTermPropsArray }
