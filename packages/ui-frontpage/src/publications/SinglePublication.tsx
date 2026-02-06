import { Card, CardContent, Chip, Grid, Typography } from "@mui/material"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { parseISO, format } from "date-fns/fp"
import { grey, blueGrey, lightBlue, orange } from "@mui/material/colors"
import { shortenAllNames, formatTitle } from "@dictybase/ui-common"
import { type PublicationItem } from "../papers/LatestPaperItem"

type SinglePublicationProperties = {
  data: PublicationItem
}

const SinglePublication = ({ data }: SinglePublicationProperties) => {
  const { abstract, journal, pubmedId, publishDate, authors } = data
  const formattedAuthors = shortenAllNames(authors)
  const title = formatTitle(data.title).full
  const formattedDate = pipe(publishDate, parseISO, format("PPP"))
  const onClick = () => {
    window.location.assign(
      `${import.meta.env.VITE_APP_PUBLICATION_URL}/${pubmedId}`,
    )
  }
  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={(theme) => ({
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${grey[400]}`,
        borderTop: `1px solid ${grey[400]}`,
        borderBottom: `1px solid ${grey[400]}`,
        paddingLeft: "1rem",
        paddingRight: "1rem",
        transition: "border-left 0.1s ease-in-out",
        "&:hover": {
          borderLeft: `5px solid ${orange[900]}`,
          cursor: "pointer",
        },
      })}>
      <CardContent
        sx={(theme) => ({
          padding: theme.spacing(3),
        })}>
        <Typography
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: "24px",
            fontFamily: "'Playfair Display Variable', serif",
          }}>
          {title}
        </Typography>
        <Typography
          sx={{
            color: grey[700],
            marginBottom: (theme) => theme.spacing(1),
          }}>{`Published in ${journal}, ${formattedDate}`}</Typography>
        <Typography
          sx={(theme) => ({
            color: theme.palette.primary.main,
            marginBottom: theme.spacing(1),
          })}>
          PMID: {pubmedId}
        </Typography>
        <Grid
          container
          spacing={1}
          sx={(theme) => ({
            marginBottom: theme.spacing(1),
          })}>
          {pipe(
            formattedAuthors,
            Amap((author) => (
              <Grid item key={author}>
                <Chip
                  size="small"
                  label={author}
                  sx={{
                    color: blueGrey[800],
                    border: `1px solid ${grey[200]}`,
                    backgroundColor: lightBlue[50],
                  }}
                />
              </Grid>
            )),
          )}
        </Grid>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            fontFamily: "'Playfair Display Variable', serif",
          }}>
          Abstract
        </Typography>
        <Typography
          variant="body1"
          sx={(theme) => ({
            fontSize: "16px",
            marginBottom: theme.spacing(2),
            color: blueGrey[900],
          })}>
          {abstract}
        </Typography>
      </CardContent>
    </Card>
  )
}

export { SinglePublication }
