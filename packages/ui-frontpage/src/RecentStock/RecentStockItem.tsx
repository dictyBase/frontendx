import { Grid, makeStyles, Typography } from "@material-ui/core"

type ItemRowProperties = {
  id: string
  name: string
  dateAdded: string
}

const useRecentStockItemStyles = makeStyles({
  idContainer: {
    textAlign: "left",
  },
  idText: {
    textDecoration: "underline",
    "&:hover": {
      color: "red",
    },
  },
  spacer: {
    width: "2rem",
  },
  nameContainer: {
    textAlign: "left",
    flexGrow: 1,
  },
  dateContainer: {
    textAlign: "right",
    fontStyle: "italic",
  },
})

const RecentStockItem = ({ id, name, dateAdded }: ItemRowProperties) => {
  const { idContainer, spacer, idText, nameContainer, dateContainer } =
    useRecentStockItemStyles()
  return (
    <Grid container>
      <Grid item className={idContainer}>
        <a href={`${import.meta.env.VITE_APP_STOCKCENTER_URL}`}>
          <Typography className={idText} variant="body1">
            {id}
          </Typography>
        </a>
      </Grid>
      <Grid item className={spacer} />
      <Grid item className={nameContainer}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      <Grid item className={dateContainer}>
        <Typography variant="body2">{dateAdded}</Typography>
      </Grid>
    </Grid>
  )
}

export { RecentStockItem }
