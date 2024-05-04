/* eslint-disable react/no-array-index-key */
import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Theme,
} from "@material-ui/core"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"
import ReplayIcon from "@material-ui/icons/Replay"
import { makeStyles } from "@material-ui/styles"
import { LoadingDisplay } from "@dictybase/ui-common"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import {
  takeLeft as AtakeLeft,
  map as Amap,
  makeBy as AmakeBy,
} from "fp-ts/Array"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LatestPaperItem } from "./LatestPaperItem"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

type LatestPapersProperties = {
  data: Array<PublicationItem>
}

type LatestPapersErrorProperties = {
  refetch: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: "left",
    paddingBottom: "10px",
    backgroundColor: "#eff8fb",
    color: "#04313f",
    borderRadius: "15px",
    boxSizing: "border-box",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
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
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "inherit",
      color: "red",
    },
  },
  bottomLink: {
    fontWeight: "normal",
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
}))

const LatestPapersLoader = () => {
  const { container, header, title, listBox } = useStyles()
  return (
    <Container maxWidth={false} className={container}>
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
        {pipe(
          AmakeBy(3, (i) => i),
          Amap((i) => (
            <Grid key={i} item>
              <LoadingDisplay rows={2} height={40} />
            </Grid>
          )),
        )}
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
          Retry
        </Button>
      </Grid>
    </Grid>
  )
}

const LatestPapersTitle = () => {
  const { header, title } = useStyles()
  return (
    <Box className={header}>
      <Grid container>
        <Typography className={title}>
          <FontAwesomeIcon icon="paperclip" size="sm" />
        </Typography>
        <span className={title}>LATEST PAPERS</span>
      </Grid>
    </Box>
  )
}

const MorePapersLink = () => {
  const { link } = useStyles()
  return (
    <Link to="/papers">
      <Button className={link} endIcon={<DoubleArrowIcon />}>
        <Typography variant="h2"> More Papers </Typography>
      </Button>
    </Link>
  )
}

const LatestPapersView = ({ data }: LatestPapersProperties) => {
  const { container, listBox, bottomLink } = useStyles()
  return (
    <Container maxWidth={false} className={container}>
      <LatestPapersTitle />
      <Grid container direction="column" component="ul" className={listBox}>
        {pipe(
          data,
          AtakeLeft(5),
          Amap((p) => <LatestPaperItem data={p} />),
        )}
      </Grid>
      <Grid container justifyContent="flex-end" className={bottomLink}>
        <Grid item>
          <MorePapersLink />
        </Grid>
      </Grid>
    </Container>
  )
}

export { LatestPapersView, LatestPapersLoader, LatestPapersError }
