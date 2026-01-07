import { Theme } from "@mui/material/styles";
import { makeStyles } from 'tss-react/mui';
import { blue } from "@mui/material/colors"
import Button from "@mui/material/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLink } from "@fortawesome/free-solid-svg-icons"

const useStyles = makeStyles<void, 'icon'>()((theme: Theme, _params, classes) => ({
  root: {
    backgroundColor: blue[100],
    borderRadius: "16px",
    lineHeight: 1.5,
    "&:hover, &.Mui-focusVisible": {
      [`& .${classes.icon}`]: {
        color: theme.palette.primary.dark,
        marginLeft: theme.spacing(1),
        visibility: "visible",
        opacity: 1,
      },
    },
    marginRight: "5px",
  },
  label: {
    transition: "0.2s",
    textTransform: "initial",
  },
  icon: {
    visibility: "hidden",
    opacity: 0,
    transition: "0.3s",
    color: theme.palette.common.white,
    marginLeft: -theme.spacing(1.5),
    "& .MuiIcon--fa": {
      padding: 0,
    },
  },
}));

type LinkTagProperties = {
  /** The item to link to */
  item: string
  /** The subroute to use (i.e. publication, gene) */
  route: string
}

/**
 * LinkTag is a tag-style display for showing links.
 */
const LinkTag = ({ item, route }: LinkTagProperties) => {
  const { classes } = useStyles()

  return (
    <Button
      component="a"
      href={`/${route}/${item}`}
      title={`View ${route} ${item}`}
      classes={{ root: classes.root, label: classes.label }}>
      {item}
      <FontAwesomeIcon
        icon={faExternalLink}
        className={classes.icon}
        size="sm"
      />
    </Button>
  )
}

export { LinkTag }
