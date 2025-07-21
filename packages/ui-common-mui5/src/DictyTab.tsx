import { Tab, type TabProps } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { grey } from "@mui/material/colors"

const useStyles = makeStyles((theme) => ({
  tab: {
    borderRadius: "10px",
    fontFamily: "'Poppins', sans-serif",
    color: theme.palette.primary.main,
    opacity: 1,
    fontSize: "1rem",
  },
  selected: {
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: `2px 2px 3px ${grey[500]}`,
  },
}))

/**
 * A customized Tab component for dictyBase applications.
 */
const DictyTab = ({ ...properties }: TabProps) => {
  const { selected, tab } = useStyles()
  return <Tab wrapped classes={{ selected }} className={tab} {...properties} />
}

export { DictyTab }
