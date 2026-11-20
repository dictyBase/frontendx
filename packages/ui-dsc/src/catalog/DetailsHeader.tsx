import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { DetailsHeaderCopyIcon } from "./DetailsHeaderCopyIcon"
import { characterConverter } from "../utils/characterConverter"

const marginBottomStyle = {
  marginBottom: 2,
}

type DetailsHeaderProperties = {
  /** Stock ID */
  id: string
  /** Strain descriptor or plasmid name */
  name: string
}

/**
 * DetailsHeader is the header at the top of every stock details page.
 */

const DetailsHeader = ({ name, id }: DetailsHeaderProperties) => (
  <Box mt={2}>
    <Typography sx={marginBottomStyle} variant="h1" noWrap>
      {characterConverter(name)}
    </Typography>
    <Typography sx={marginBottomStyle} variant="h3" color="textSecondary">
      <em>{id}</em>
      <DetailsHeaderCopyIcon id={id} />
    </Typography>
  </Box>
)

export { DetailsHeader }
