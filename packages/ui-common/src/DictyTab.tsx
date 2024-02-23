import { Tab, type TabProps, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  tab: {
    borderRadius: "10px",
    color: theme.palette.primary.main,
    opacity: 1,
    fontSize: "1rem",
  },
  selected: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
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
