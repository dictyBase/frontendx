import {
  Box,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"
import {
  getAuthorsCitationString,
  getPublicationYear,
  formatTitle,
} from "../../common/utils/citation"

const useStyles = makeStyles({
  leadText: {
    color: "#0b3861",
    paddingRight: "10px",
  },
  mainContent: {
    // "&:hover": {
    //   textDecoration: "underline",
    // },
  },
  sourceContent: {
    color: "#0b3861",
  },
  sourceTitle: {
    paddingTop: "7px",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    fontSize: "22px",
  },
})

type SinglePublicationProperties = {
  data: PublicationItem
}

const SinglePublication = ({ data }: SinglePublicationProperties) => {
  const { mainContent, listItem, link } = useStyles()
  const authors = getAuthorsCitationString(data.authors)
  const date = getPublicationYear(data.publishDate)
  const title = formatTitle(data.title).full
  const { abstract, journal, identifiers, pubmedId } = data
  return (
    <li className={listItem}>
      <Grid container direction="column" className={mainContent}>
        <Grid item>
          <Typography variant="h2" color="primary">
            {`${title}`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{authors}</Typography>
        </Grid>
        <Grid item>
          <Typography>{journal}</Typography>
        </Grid>
        <Grid item>
          <Typography>{identifiers}</Typography>
        </Grid>
        <Grid item>
          <Typography>{abstract}</Typography>
        </Grid>
      </Grid>
    </li>
  )
}

export { SinglePublication }
