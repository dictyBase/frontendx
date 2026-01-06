import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  fromNullable as OfromNullable,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { isNonEmpty as AisNonEmpty } from "fp-ts/Array"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import ListItem from "@mui/material/ListItem"
import makeStyles from '@mui/styles/makeStyles';
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

const toPublicationComponent = (
  publications: NonNullable<
    ListStrainsWithPhenotypeQuery["listStrainsWithAnnotation"]
  >["strains"][number]["publications"],
) =>
  pipe(
    publications,
    OfromNullable,
    Omap((pubArray) =>
      pipe(
        pubArray,
        AisNonEmpty,
        Bmatch(
          () => <></>,
          () => <PublicationDisplay publication={pubArray[0] as Publication} />,
        ),
      ),
    ),
    OgetOrElse(() => <></>),
  )

type SearchPhenotypeListItemProperties = {
  strain: NonNullable<
    ListStrainsWithPhenotypeQuery["listStrainsWithAnnotation"]
  >["strains"][number]
}

const SearchPhenotypeListItem = ({
  strain,
}: SearchPhenotypeListItemProperties) => {
  const classes = useStyles()

  const publications = strain?.publications
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
            {toPublicationComponent(publications)}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export { SearchPhenotypeListItem }
