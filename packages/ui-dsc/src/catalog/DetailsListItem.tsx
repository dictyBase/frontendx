import { ReactNode } from "react"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import ListItem from "@mui/material/ListItem"
import { formatFormattedString } from "../utils/formatFormattedString"

type DetailsListitemProperties = {
  /** Type of content to display (i.e. Strain Descriptor, Genotype, etc.) */
  title: string
  /** The actual data for that field */
  content: ReactNode
}

/**
 * DetailsListItem used to display a single row of data for a stock item.
 *
 * String content is passed through {@link formatFormattedString} so that
 * HTML character entities and format tags (i.e. `<sup>`) are rendered as
 * formatted text rather than raw markup.
 *
 * @param title - Label rendered in the left column of the row.
 * @param content - Value rendered in the right column of the row.
 */
const DetailsListItem = ({ title, content }: DetailsListitemProperties) => (
  <ListItem
    sx={{
      "&:nth-of-type(odd)": {
        backgroundColor: "#F4F6F8",
      },
      "@media (max-width: 420px)": {
        display: "block !important",
      },
    }}
    divider>
    <Grid
      item
      xs={12}
      sm={3}
      sx={{
        "@media (max-width: 420px)": {
          marginBottom: "10px",
        },
      }}>
      <Typography component="span" variant="body2" sx={{ fontWeight: 420 }}>
        {title}
      </Typography>
    </Grid>
    <Grid item xs={12} sm={9}>
      <Typography component="span" variant="body1">
        {formatFormattedString(content)}
      </Typography>
    </Grid>
  </ListItem>
)

export { DetailsListItem }
