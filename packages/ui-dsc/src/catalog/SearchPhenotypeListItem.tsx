import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import ListItem from "@material-ui/core/ListItem"
import { makeStyles } from "@material-ui/core/styles"
import {
  ListStrainsWithPhenotypeQuery,
  Gene,
  Publication,
} from "dicty-graphql-schema"
import { GenesDisplay } from "./GenesDisplay"
import { PublicationDisplay } from "./PublicationDisplay"
import { characterConverter } from "../utils/characterConverter"

const useStyles = makeStyles({
  row: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
  },
  item: {
    paddingRight: "10px",
    fontSize: "0.9rem",
  },
})

type SearchPhenotypeListItemProperties = {
  strain: NonNullable<
    ListStrainsWithPhenotypeQuery["listStrainsWithAnnotation"]
  >["strains"][number]
}

const SearchPhenotypeListItem = ({
  strain,
}: SearchPhenotypeListItemProperties) => {
  const classes = useStyles()

  const publications = strain?.publications as Publication[]
  const genes = (strain?.genes as Gene[]) ?? []

  return (
    <ListItem className={classes.row}>
      <Grid container spacing={0} alignItems="center">
        <Grid item sm={3} className={classes.item}>
          <Typography variant="body2" noWrap>
            <Link to={`/strains/${strain.id}`}>
              {characterConverter(strain.label)}
            </Link>
          </Typography>
        </Grid>
        <Grid item sm={3} className={classes.item}>
          <Typography variant="body2" noWrap>
            <GenesDisplay genes={genes} />
          </Typography>
        </Grid>
        <Grid item sm={6} className={classes.item}>
          <Typography component="span" variant="body2">
            {match(publications.length > 0)
              .with(true, () => (
                <PublicationDisplay
                  publication={publications[0] as Publication}
                />
              ))
              .with(false, () => <></>)
              .exhaustive()}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export { SearchPhenotypeListItem }
