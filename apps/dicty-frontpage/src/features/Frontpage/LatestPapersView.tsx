/* eslint-disable react/no-array-index-key */
import { Grid, Box, Container, Typography, Button } from "@material-ui/core"
import ReplayIcon from "@material-ui/icons/Replay"
import { makeStyles } from "@material-ui/styles"
import { LoadingDisplay } from "@dictybase/ui-common"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LatestPaperItem } from "./LatestPaperItem"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

type LatestPapersProperties = {
  data: Array<PublicationItem>
}

type LatestPapersErrorProperties = {
  refetch: () => void
}

const useStyles = makeStyles({
  container: {
    textAlign: "left",
    paddingBottom: "10px",
    backgroundColor: "#eff8fb",
    borderRadius: "15px",
    boxSizing: "border-box",
    marginBottom: "10px",
    "@media (max-width: 768px)": {},
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
    textDecoration: "underline",
    fontWeight: "normal",
    textAlign: "right",
    paddingBottom: "10px",

    "@media (min-width: 1400px)": {},
  },
  errorContainer: {
    height: "300px",
  },
  errorText: {
    fontStyle: "italic",
    color: "#75746f",
  },
})

const LatestPapersLoader = () => {
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
      <Grid
        container
        direction="column"
        spacing={1}
        component="ul"
        className={listBox}>
        {new Array(3).fill(0).map((element, index) => (
          <Grid key={index} item>
            <LoadingDisplay rows={2} height={40} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const LatestPapersError = ({ refetch }: LatestPapersErrorProperties) => {
  const { container, errorContainer, errorText } = useStyles()
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      className={`${errorContainer} ${container}`}>
      <Grid item>
        <Typography className={errorText} color="error">
          There was a problem loading the latest papers.
        </Typography>
      </Grid>
      <Grid item>
        <Button endIcon={<ReplayIcon />} onClick={refetch}>
          Refetch
        </Button>
      </Grid>
    </Grid>
  )
}

const LatestPapersView = ({ data }: LatestPapersProperties) => {
  const { container, header, title, listBox, bottomLink } = useStyles()
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
      <Grid container direction="column" component="ul" className={listBox}>
        {data.slice(0, 3).map((p) => (
          <Grid key={p.pubmedId} item>
            <LatestPaperItem data={p} />
          </Grid>
        ))}
      </Grid>
      <Container className={bottomLink}>
        <Link to="/papers"> More Papers </Link>
      </Container>
    </Container>
  )
}

export { LatestPapersView, LatestPapersLoader, LatestPapersError }
