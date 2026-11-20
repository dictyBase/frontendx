import { Tab, type TabProps } from "@mui/material"
import { grey } from "@mui/material/colors"

/**
 * A customized Tab component for dictyBase applications.
 */
const DictyTab = ({ ...properties }: TabProps) => (
  <Tab
    wrapped
    sx={(theme) => ({
      borderRadius: "10px",
      fontFamily: "'Poppins', sans-serif",
      color: theme.palette.primary.main,
      opacity: 1,
      fontSize: "1rem",
      "&.Mui-selected": {
        fontWeight: 600,
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: `2px 2px 3px ${grey[500]}`,
      },
    })}
    {...properties}
  />
)

export { DictyTab }
