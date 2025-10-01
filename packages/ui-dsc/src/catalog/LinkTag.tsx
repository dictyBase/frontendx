import { blue } from "@mui/material/colors"
import Button from "@mui/material/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLink } from "@fortawesome/free-solid-svg-icons"


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
  return (
    <Button
      component="a"
      href={`/${route}/${item}`}
      title={`View ${route} ${item}`}
      sx={(theme) => ({
        backgroundColor: blue[100],
        borderRadius: "16px",
        lineHeight: 1.5,
        marginRight: "5px",
        "& .MuiButton-label": {
          transition: "0.2s",
          textTransform: "initial",
        },
        "&:hover, &.Mui-focusVisible": {
          "& .link-icon": {
            color: theme.palette.primary.dark,
            marginLeft: theme.spacing(1),
            visibility: "visible",
            opacity: 1,
          },
        },
      })}>
      {item}
      <FontAwesomeIcon
        icon={faExternalLink}
        className="link-icon"
        size="sm"
        style={{
          visibility: "hidden",
          opacity: 0,
          transition: "0.3s",
          color: "white",
          marginLeft: "-12px",
        }}
      />
    </Button>
  )
}

export { LinkTag }
