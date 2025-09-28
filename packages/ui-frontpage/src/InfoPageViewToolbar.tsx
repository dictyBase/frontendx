import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { timeSince } from "./utils/timeSince"
// import { ErrorNotification } from "./ErrorNotification"
import { capitalizeFirstCharacter } from "./utils/stringCapitalizations"
import { UpdatedByUser } from "./types"

// const error =
//   "Your login token has expired. Please log out and then log back in to regain full user access."

type Properties = {
  /** Timestamp for when this content was last updated */
  lastUpdate: string
  /** User object for who last updated this content */
  user: UpdatedByUser
  /** Function to execute when user clicks edit icon */
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

/** Displays the info page data that was fetched from the InfoPageContainer component */

const InfoPageViewToolbar = ({ handleClick, lastUpdate, user }: Properties) => {
  const fullName = `${user.first_name} ${user.last_name}`
  const role = user.roles?.at(0)?.role
    ? `${capitalizeFirstCharacter(user.roles?.at(0)?.role as string)}`
    : "dictyBase User"

  return (
    <Box mt={2}>
      <Box
        sx={{
          backgroundColor: "#fafafa",
          borderRadius: "2px",
          border: "1px solid #ddd",
          padding: 1,
          marginBottom: 2,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        data-testid="info-page-toolbar">
        <Box
          component="span"
          sx={{ color: (theme) => theme.palette.primary.light }}>
          <strong>
            <FontAwesomeIcon
              sx={{
                color: (theme) => theme.palette.primary.light,
                fontSize: "1rem",
                marginRight: 0.5,
              }}
              icon="user"
            />{" "}
            {fullName}
          </strong>{" "}
          edited {timeSince(lastUpdate)} ago
        </Box>
        <Box
          component="span"
          sx={{
            marginLeft: "auto",
            marginRight: 1,
            padding: 1,
            fontSize: "0.8rem",
            fontWeight: "bold",
            lineHeight: 1,
            color: "#fff",
            whiteSpace: "nowrap",
            borderRadius: "0.25em",
            backgroundColor: (theme) => theme.palette.primary.light,
          }}>
          {role}
        </Box>{" "}
        <Tooltip title="Edit Page" placement="bottom">
          <IconButton
            sx={{
              color: (theme) => theme.palette.primary.light,
              fontSize: "1rem",
              marginRight: 0.5,
            }}
            onClick={handleClick}>
            <FontAwesomeIcon icon="pencil-alt" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export { InfoPageViewToolbar }
