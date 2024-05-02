import { Grid, makeStyles, Typography } from "@material-ui/core"

type ItemRowProperties = {
  id: string
  name: string
  dateAdded: string
}

const useRecentStockItemStyles = makeStyles({
  idContainer: {
    flexGrow: 1,
    textAlign: "left",
  },
  idText: {
    textDecoration: "underline",
    "&:hover": {
      color: "red",
    },
  },
  nameContainer: {
    textAlign: "left",
  },
  dateContainer: {
    flexGrow: 1,
    textAlign: "right",
    fontStyle: "italic",
  },
})

const RecentStockItem = ({ id, name, dateAdded }: ItemRowProperties) => {
  const { idContainer, idText, nameContainer, dateContainer } = useRecentStockItemStyles()
  return (
    <Grid container justifyContent="center">
      <Grid item className={idContainer} sm={3}>
        <a href="#">
          <Typography className={idText} variant="body1">{id}</Typography>
        </a>
      </Grid>
      <Grid item className={nameContainer} sm={6}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      <Grid item className={dateContainer} sm={3}>
        <Typography variant="body2">{dateAdded}</Typography>
      </Grid>
    </Grid>
  )
}

export { RecentStockItem }
