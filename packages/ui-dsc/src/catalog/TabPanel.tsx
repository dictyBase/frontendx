import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

type TabPanelProperties = {
  /** Any content inside the tab panel */
  children: any
  /** Tab value */
  value: number
  /** Index of tab selected */
  index: number
}

/**
 * TabPanel is a simple wrapper for content inside of tab panels.
 */
const TabPanel = ({ children, value, index, ...other }: TabPanelProperties) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}>
    {value === index && <Box>{children}</Box>}
  </Typography>
)

export { TabPanel }
