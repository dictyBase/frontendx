import { Typography, Grid, Checkbox } from "@material-ui/core"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { parseISO, format } from "date-fns/fp"
import { parseContentToText } from "@dictybase/editor"
import { truncateString } from "../utils/truncateString"

type NewsItemProperties = {
  name: string
  content: string
  updated_at: string
}

const EditableNewsItem = ({
  name,
  content,
  updated_at,
}: NewsItemProperties) => (
  <Grid container direction="row" wrap="nowrap">
    <Grid item>
      <Checkbox />
    </Grid>
    <Grid item>
      <Link to={`../news/${name}/editable`}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Typography variant="h2">
              {pipe(updated_at, parseISO, format("PPPP"))}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textPrimary">
              {truncateString(parseContentToText(content), 400)}
            </Typography>
          </Grid>
        </Grid>
      </Link>
    </Grid>
  </Grid>
)

export { EditableNewsItem }
