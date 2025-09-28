import { Grid, Typography } from "@mui/material"

type ItemRowProperties = {
  id: string
  name: string
  dateAdded: string
}

const RecentStockItem = ({ id, name, dateAdded }: ItemRowProperties) => (
  <Grid container>
    <Grid item sx={{ textAlign: "left" }}>
      <a href={`${import.meta.env.VITE_APP_STOCKCENTER_URL}`}>
        <Typography
          sx={{
            textDecoration: "underline",
            "&:hover": {
              color: "red",
            },
          }}
          variant="body1">
          {id}
        </Typography>
      </a>
    </Grid>
    <Grid item sx={{ width: "2rem" }} />
    <Grid item sx={{ textAlign: "left", flexGrow: 1 }}>
      <Typography variant="body1">{name}</Typography>
    </Grid>
    <Grid item sx={{ textAlign: "right", fontStyle: "italic" }}>
      <Typography variant="body2">{dateAdded}</Typography>
    </Grid>
  </Grid>
)

export { RecentStockItem }
