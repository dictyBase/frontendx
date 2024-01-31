import { Grid, Box, Container, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LatestPaperItem } from "./LatestPaperItem"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

type LatestPapersProperties = {
  data: Array<PublicationItem>
}

const useStyles = makeStyles({
  container: {
    textAlign: "left",
    paddingBottom: "10px",
    backgroundColor: "#eff8fb",
    borderRadius: "15px",
    boxSizing: "border-box",
    marginBottom: "10px",
    "@media (max-width: 768px)": {
      height: "350px",
    },
  },
  title: {
    paddingLeft: "5px",
    color: "#086a87",
    fontSize: "20px",
    verticalAlign: "top",
    textAlign: "left",
  },
  header: {
    color: "black",
    fontSize: "20px",
    padding: "15px 30px 0px 35px",
    verticalAlign: "top",
    textAlign: "right",

    "@media (max-width: 767px)": {
      fontSize: "24px",
      textAlign: "right",
      padding: "20px 5px 20px 15px",
    },
  },
  listBox: {
    padding: "0px 25px 10px 25px",
    fontSize: "13px",
    overflow: "hidden",
    maxHeight: "440px",
    marginBottom: "5px",
    marginTop: "12px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
  },
  link: {
    textDecoration: "none",
    color: "#428bca",
  },
  bottomLink: {
    color: "#0b3861",
    fontSize: "11px",
    fontStyle: "italic",
    fontWeight: "normal",
    textAlign: "center",
    paddingBottom: "10px",

    "@media (min-width: 1400px)": {
      paddingTop: "30px",
      fontSize: "12px",
    },
  },
})

const LatestPapersView = ({ data }: LatestPapersProperties) => {
  const { container, header, title, listBox } = useStyles()
  return (
    <Container className={container}>
      <Box className={header}>
        <Grid container>
          <Typography className={title}>
            <FontAwesomeIcon icon="paperclip" size="sm" />
          </Typography>
          <span className={title}>LATEST PAPERS</span>
        </Grid>
      </Box>
      <Grid container component="ul" className={listBox}>
        {data.slice(0, 3).map((p) => (
          <Grid item>
            <LatestPaperItem data={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export { LatestPapersView }
