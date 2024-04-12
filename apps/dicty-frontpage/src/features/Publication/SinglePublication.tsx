import { Box, Grid, Typography } from "@material-ui/core"
import { DateDisplay } from "@dictybase/ui-common"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"
import {
  getAuthorsCitationString,
  formatTitle,
} from "../../common/utils/citation"

const useStyles = makeStyles({
  leadText: {
    color: "#0b3861",
    paddingRight: "10px",
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
  const { abstract, journal, pubmedId, publishDate, authors } = data
  const { link } = useStyles()
  const authorString = getAuthorsCitationString(authors)
  const title = formatTitle(data.title).full
  return (
    <li>
      <Box>
        <Typography variant="h2" color="primary">
          <Link
            className={link}
            reloadDocument
            to={`${import.meta.env.VITE_APP_PUBLICATION_URL}/${pubmedId}`}>
            {title}
          </Link>
        </Typography>
        <Typography>{authorString}</Typography>
        <Grid container spacing={1}>
          <Grid item>
            <Typography display="inline">
              <em>{journal}</em>
            </Typography>
          </Grid>
          <Grid item>
            <Typography> | </Typography>
          </Grid>
          <Grid item>
            <DateDisplay dateString={publishDate} />
          </Grid>
        </Grid>
        <Typography>{abstract}</Typography>
      </Box>
    </li>
  )
}

export { SinglePublication }
