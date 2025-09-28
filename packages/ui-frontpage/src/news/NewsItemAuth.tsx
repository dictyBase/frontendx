import { Typography, Paper, Grid } from "@mui/material"
import { teal } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { parseISO, format } from "date-fns/fp"
import { truncateString } from "../utils/truncateString"

type NewsItemProperties = {
  name: string
  content: string
  createdAt: string
}

const NewsItemAuth = ({ name, content, createdAt }: NewsItemProperties) => (
  <Link to={`../news/${name}/editable`}>
    <Paper
      elevation={4}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 1,
        "&:hover": { boxShadow: (theme) => theme.shadows[7] },
      }}>
      <Grid container direction="column">
        <Grid
          item
          sx={{
            background: (theme) =>
              `linear-gradient(to left, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            borderTopLeftRadius: 1,
            borderTopRightRadius: 1,
            color: (theme) => theme.palette.getContrastText(teal[600]),
            padding: 1.5,
          }}>
          <Typography
            variant="h3"
            variantMapping={{ h3: "h2" }}
            sx={{ fontWeight: 600 }}>
            {pipe(createdAt, parseISO, format("PPPP"))}
          </Typography>
        </Grid>
        <Grid item sx={{ padding: "1rem" }}>
          <Typography>{truncateString(content, 400)}</Typography>
        </Grid>
      </Grid>
    </Paper>
  </Link>
)

export { NewsItemAuth }
