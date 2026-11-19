import { useNavigate } from "react-router-dom"
import { Chip } from "@mui/material"
import { Gene } from "dicty-graphql-schema"
import { blueGrey } from "@mui/material/colors"

type GeneChipProperties = { gene: Gene }

const GeneChip = ({ gene }: GeneChipProperties) => {
  const navigate = useNavigate()
  return (
    <Chip
      clickable
      onClick={() => navigate(`/${gene.name}`)}
      label={gene.name}
      size="medium"
      variant="outlined"
      sx={{
        minWidth: "100%",
        minHeight: "5rem",
        justifyContent: "start",
        boxShadow: `1px 1px 1px ${blueGrey[200]}`,
        fontSize: "24px",
        paddingLeft: "0rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    />
  )
}

export { GeneChip }
