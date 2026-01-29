import type { TabProps } from "@mui/material"

const mockDictyTabProps: TabProps = {
  label: "Overview",
  value: "overview",
}

const mockDictyTabPropsWithIcon: TabProps = {
  label: "Settings",
  value: "settings",
  icon: <span>⚙️</span>,
}

const mockDictyTabPropsDisabled: TabProps = {
  label: "Disabled",
  value: "disabled",
  disabled: true,
}

export { mockDictyTabProps, mockDictyTabPropsWithIcon, mockDictyTabPropsDisabled }
