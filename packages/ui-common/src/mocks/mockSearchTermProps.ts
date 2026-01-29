import type { ChipProps } from "@mui/material"

const mockSearchTermProps: ChipProps = {
  label: "search term",
  onDelete: () => {},
}

const mockSearchTermPropsWithoutDelete: ChipProps = {
  label: "filter: active",
}

const mockSearchTermPropsWithIcon: ChipProps = {
  label: "tag",
  onDelete: () => {},
  icon: <span>🏷️</span>,
}

export {
  mockSearchTermProps,
  mockSearchTermPropsWithoutDelete,
  mockSearchTermPropsWithIcon,
}
