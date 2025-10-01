import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { DetailsHeaderCopyIcon } from "./DetailsHeaderCopyIcon"
import { characterConverter } from "../utils/characterConverter"


type DetailsHeaderProperties = {
  /** Stock ID */
  id: string
  /** Strain descriptor or plasmid name */
  name: string
}

/**
 * DetailsHeader is the header at the top of every stock details page.
 */

const DetailsHeader = ({ name, id }: DetailsHeaderProperties) => {
  return (
    <Box mt={2}>
      <Typography sx={{ marginBottom: 2 }} variant="h1" noWrap>
        {characterConverter(name)}
      </Typography>
      <Typography sx={{ marginBottom: 2 }} variant="h3" color="textSecondary">
        <em>{id}</em>
        <DetailsHeaderCopyIcon id={id} />
      </Typography>
    </Box>
  )
}

export { DetailsHeader }
