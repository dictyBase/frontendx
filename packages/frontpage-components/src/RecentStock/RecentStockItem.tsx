import { Grid, makeStyles, Typography } from "@material-ui/core"
import teal from "@material-ui/core/colors/teal"

type ItemRowProperties = {
  name: string
  dateAdded: string
}

const useRecentStockItemStyles = makeStyles({
  row: {
    flexGrow: 1,
  },
  nameText: {
    // color: teal[900],
  },
  date: {
    textAlign: "right",
    fontStyle: "italic",
  },
})

const RecentStockItem = ({ name, dateAdded }: ItemRowProperties) => {
  const { row, nameText, date } = useRecentStockItemStyles()
  return (
    <Grid container alignItems="center">
      <Grid item className={`${row} ${nameText}`}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      <Grid item className={`${row} ${date}`}>
        <Typography variant="body2">{dateAdded}</Typography>
      </Grid>
    </Grid>
  )
}

export { RecentStockItem }
