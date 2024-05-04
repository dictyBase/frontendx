import { Grid, makeStyles, Typography } from "@material-ui/core"

type ItemRowProperties = {
  id: string
  name: string
  dateAdded: string
}

const useRecentStockItemStyles = makeStyles({
  idContainer: {
    // flexGrow: 1,
    textAlign: "left",
  },
  idText: {
    textDecoration: "underline",
    "&:hover": {
      color: "red",
    },
  },
  spacer: {
    //flexBasis: "2rem"
    width: "2rem"
  },
  nameContainer: {
    textAlign: "left",
    // paddingLeft: "3rem",
    flexGrow: 1
  },
  dateContainer: {
    // flexGrow: 1,
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
        <a href="#">
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
