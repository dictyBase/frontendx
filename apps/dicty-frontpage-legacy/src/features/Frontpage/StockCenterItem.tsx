import { makeStyles } from "@material-ui/core/styles"
import {
  ListRecentPlasmidsQuery,
  ListRecentStrainsQuery,
} from "dicty-graphql-schema"
import { Fallback } from "../../common/components/Fallback"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
    fontSize: "12px",
  },
})

interface PlasmidItemProperties {
  data: ListRecentPlasmidsQuery & ListRecentStrainsQuery
  type: "Plasmid" | "Strain"
}

const StockCenterItem = ({ data, type }: PlasmidItemProperties) => {
  const classes = useStyles()

  if (type === "Plasmid") {
    const recentPlasmids = data?.listRecentPlasmids?.map((plasmid) => (
      <li className={classes.listItem} key={plasmid.id}>
        {plasmid.name}
      </li>
    ))
    return <>{recentPlasmids}</>
  }
  if (type === "Strain") {
    const recentStrains = data?.listRecentStrains?.map((strain) => (
      <li className={classes.listItem} key={strain.id}>
        {strain.systematic_name}
      </li>
    ))
    return <>{recentStrains}</>
  }

  return <Fallback />
}

export { StockCenterItem }
