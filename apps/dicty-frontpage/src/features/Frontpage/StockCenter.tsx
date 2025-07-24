import { makeStyles } from "@material-ui/core/styles"
import { Box, Grid } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StockCenterStrainQuery } from "./StockCenterStrainQuery"
import { StockCenterPlasmidQuery } from "./StockCenterPlasmidQuery"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
    fontSize: "12px",
  },
  listBox: {
    padding: "0px 25px 10px 25px",
    fontSize: "12px",
    marginBottom: "5px",
    paddingBottom: "0px",
    marginTop: "5px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
  },
  plusSign: {
    color: "#0b3861",
    fontSize: "11px",
    fontStyle: "italic",
    fontWeight: "normal",
    textAlign: "center",
    paddingBottom: "0px",

    "@media (min-width: 1400px)": {
      paddingTop: "30px",
      fontSize: "12px",
    },
  },
  title: {
    paddingTop: "5px",
    paddingLeft: "5px",
  },
  subheader: {
    backgroundColor: "#effbfb",
    color: "black",
    fontSize: "12px",
    letterSpacing: "5px",
    padding: "1px 0px 1px 0px",

    "@media (max-width: 767px)": {
      fontSize: "12px",
      textAlign: "center",
    },
  },
  header: {
    backgroundColor: "#004080",
    color: "#efeffb",
    fontSize: "18px",
    textAlign: "center",
    padding: "10px 0px 10px 0px",
    border: "1px dotted #f5f6ce",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    "@media (max-width: 767px)": {
      fontSize: "18px",
      textAlign: "center",
    },
  },
  container: {
    textAlign: "center",
    padding: "5px 5px 0 5px",
    marginBottom: "10px",
  },
  plasmidBox: {
    color: "#fff",
    backgroundColor: "#0073e6",
    textAlign: "center",
    paddingBottom: "5px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 767px)": {
      fontSize: "12px",
    },
  },
  strainBox: {
    color: "#242124",
    backgroundColor: "#80c1ff",
    textAlign: "center",
    paddingBottom: "5px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 767px)": {
      fontSize: "12px",
    },
  },
})

/** Widget that displays the most recent plasmids and strains in the Stock Center */
const StockCenter = () => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <FontAwesomeIcon icon="shopping-cart" size="sm" />
        <span className={classes.title}> DICTY STOCK CENTER</span>
      </Box>
      <Box className={classes.subheader}>
        <strong>New items</strong>
      </Box>
      <Grid container>
        <Grid item xs={6} className={classes.plasmidBox}>
          <Box className={classes.title}>PLASMIDS</Box>
          <ul className={classes.listBox}>
            <StockCenterPlasmidQuery />
          </ul>
          <Box className={classes.plusSign}>
            <FontAwesomeIcon icon="plus" />
          </Box>
        </Grid>
        <Grid item xs={6} className={classes.strainBox}>
          <Box className={classes.title}>STRAINS</Box>
          <ul className={classes.listBox}>
            <StockCenterStrainQuery />
          </ul>
          <Box className={classes.plusSign}>
            <FontAwesomeIcon icon="plus" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export { StockCenter }
