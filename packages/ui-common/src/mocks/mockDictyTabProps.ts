import type { TabProps } from "@mui/material"

const mockDictyTabPropsArray: TabProps[] = [
  {
    label: "Overview",
    value: "overview",
  },
  {
    label: "Settings",
    value: "settings",
  },
  {
    label: "Disabled",
    value: "disabled",
    disabled: true,
  },
]

export { mockDictyTabPropsArray }
