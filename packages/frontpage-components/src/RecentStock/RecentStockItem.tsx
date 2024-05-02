import { Grid, makeStyles, Typography } from "@material-ui/core"
import teal from "@material-ui/core/colors/teal"

type ItemRowProperties = {
  id: string
  name: string
  dateAdded: string
}

const useRecentStockItemStyles = makeStyles({
  row: {
    flexBasis: "20%",
  },
  idText: {
    flexGrow: 2,
    textDecoration: "underline",
    textAlign: "left"
  },
  nameText: {
    flexGrow: 1,
    textAlign: "left"
  },
  date: {
    flexGrow: 1,
    textAlign: "right",
    fontStyle: "italic",
  },
})

const RecentStockItem = ({ id, name, dateAdded }: ItemRowProperties) => {
  const { row, idText, nameText, date } = useRecentStockItemStyles()
  return (
    <Grid container justifyContent="center">
      <Grid item className={`${row} ${idText}`}>
        <Typography variant="body1"><a>{id}</a></Typography>
      </Grid>
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
