import { Theme } from "@mui/material/styles"
import Box from "@mui/material/Box"
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
const LinkTag = ({ item, route }: LinkTagProperties) => (
  <Button
    component="a"
    href={`/${route}/${item}`}
    title={`View ${route} ${item}`}
    sx={(theme: Theme) => ({
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText,
      borderRadius: "16px",
      lineHeight: 1.5,
      marginRight: "5px",
      "&:hover, &.Mui-focusVisible": {
        "& .link-tag-icon": {
          color: theme.palette.primary.contrastText,
          marginLeft: theme.spacing(1),
          visibility: "visible",
          opacity: 1,
        },
      },
    })}>
    <Box component="span" sx={{ transition: "0.2s", textTransform: "initial" }}>
      {item}
    </Box>
    <Box
      component="span"
      className="link-tag-icon"
      sx={(theme: Theme) => ({
        visibility: "hidden",
        opacity: 0,
        transition: "0.3s",
        color: theme.palette.common.white,
        marginLeft: -theme.spacing(1.5),
        "& .MuiIcon--fa": {
          padding: 0,
        },
      })}>
      <FontAwesomeIcon icon={faExternalLink} size="sm" />
    </Box>
  </Button>
)

export { LinkTag }
