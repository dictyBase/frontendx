import { Chip } from "@mui/material"
import { blueGrey } from "@mui/material/colors"

const GeneChipFiller = () => (
  <Chip
    data-testid="gene-chip-filler"
    size="medium"
    sx={{
      minWidth: "100%",
      minHeight: "5rem",
      justifyContent: "start",
      fontSize: "24px",
      paddingLeft: "0rem",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      backgroundColor: blueGrey[50],
    }}
  />
)

export { GeneChipFiller }
