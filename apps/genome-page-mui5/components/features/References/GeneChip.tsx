import { useRouter } from "next/router"
import { makeStyles, Chip } from "@material-ui/core"
import { Gene } from "dicty-graphql-schema"
import { blueGrey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  chip: {
    minWidth: "100%",
    minHeight: "5rem",
    justifyContent: "start",
    boxShadow: `1px 1px 1px ${blueGrey[200]}`,
    fontSize: "24px",
    paddingLeft: "0rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
})

type GeneChipProperties = { gene: Gene }

const GeneChip = ({ gene }: GeneChipProperties) => {
  const router = useRouter()
  const classes = useStyles()
  return (
    <Chip
      clickable
      onClick={() => router.push(`/${gene.name}`)}
      label={gene.name}
      size="medium"
      variant="outlined"
      className={classes.chip}
    />
  )
}

export { GeneChip }
