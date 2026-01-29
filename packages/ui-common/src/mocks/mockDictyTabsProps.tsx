import { Tab } from "@mui/material"

const mockDictyTabsProps = {
  value: 0,
  onChange: () => {},
  children: [
    <Tab key="1" label="Tab 1" value={0} />,
    <Tab key="2" label="Tab 2" value={1} />,
    <Tab key="3" label="Tab 3" value={2} />,
  ],
}

const mockDictyTabsPropsWithIndicator = {
  value: 1,
  onChange: () => {},
  children: [
    <Tab key="1" label="Overview" value={0} />,
    <Tab key="2" label="Details" value={1} />,
  ],
}

export { mockDictyTabsProps, mockDictyTabsPropsWithIndicator }
