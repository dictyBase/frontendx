import { Grid, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow"

const AuthorizedMoreNewsLink = () => (
  <Grid justifyContent="flex-end" container>
    <Grid item>
      <Link to="/news/editable">
        <Button
          sx={{
            color: (theme) => theme.palette.primary.main,
            "&:hover": {
              backgroundColor: "inherit",
              color: "red",
            },
          }}
          endIcon={<DoubleArrowIcon />}>
          <Typography variant="h2"> More News </Typography>
        </Button>
      </Link>
    </Grid>
  </Grid>
)

export { AuthorizedMoreNewsLink }
