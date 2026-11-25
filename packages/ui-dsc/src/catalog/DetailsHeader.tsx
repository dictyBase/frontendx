import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { not } from "fp-ts/Predicate"
import {
  fromNullable as OfromNullable,
  flatMap as OflatMap,
  filter as Ofilter,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { Link, useLocation } from "react-router-dom"
import Box from "@mui/material/Box"
import MuiLink from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { DetailsHeaderCopyIcon } from "./DetailsHeaderCopyIcon"
import { characterConverter } from "../utils/characterConverter"

const DEFAULT_CATALOG_PATH = "/catalog"

const marginBottomStyle = {
  marginBottom: 2,
}

type LocationState = {
  from?: string
}

const getReturnCatalogPath = (state: unknown): string =>
  pipe(
    state as LocationState | null,
    OfromNullable,
    OflatMap(({ from }) => OfromNullable(from)),
    Ofilter(not(SisEmpty)),
    OgetOrElse(() => DEFAULT_CATALOG_PATH),
  )

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
  const { state } = useLocation()
  const returnPath = getReturnCatalogPath(state)

  return (
    <Box mt={2}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
        <MuiLink
          component={Link}
          to={returnPath}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            color: "primary.main",
            fontWeight: 600,
            fontSize: "0.95rem",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}>
          <ArrowBackIcon fontSize="small" />
          Return to Catalog
        </MuiLink>
      </Box>
      <Typography sx={marginBottomStyle} variant="h1" noWrap>
        {characterConverter(name)}
      </Typography>
      <Typography sx={marginBottomStyle} variant="h3" color="textSecondary">
        <em>{id}</em>
        <DetailsHeaderCopyIcon id={id} />
      </Typography>
    </Box>
  )
}

export { DetailsHeader }
