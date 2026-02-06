import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  type Theme,
} from "@mui/material"
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow"
import ReplayIcon from "@mui/icons-material/Replay"
import { LoadingDisplay } from "@dictybase/ui-common"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import {
  takeLeft as AtakeLeft,
  map as Amap,
  makeBy as AmakeBy,
} from "fp-ts/Array"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LatestPaperItem, type PublicationItem } from "./LatestPaperItem"

type LatestPapersProperties = {
  data: Array<PublicationItem>
}

type LatestPapersErrorProperties = {
  refetch: () => void
}

const LatestPapersLoader = () => (
  <Container
    maxWidth={false}
    sx={{
      textAlign: "left",
      paddingBottom: "10px",
      backgroundColor: "#eff8fb",
      color: "#04313f",
      borderRadius: "15px",
      boxSizing: "border-box",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    }}>
    <Box
      sx={{
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
      }}>
      <Grid container>
        <Typography
          sx={{
            paddingLeft: "5px",
            color: "#086a87",
            fontSize: "20px",
            verticalAlign: "top",
            textAlign: "left",
          }}>
          <FontAwesomeIcon icon="paperclip" size="sm" />
        </Typography>
        <span
          style={{
            paddingLeft: "5px",
            color: "#086a87",
            fontSize: "20px",
            verticalAlign: "top",
            textAlign: "left",
          }}>
          LATEST PAPERS
        </span>
      </Grid>
    </Box>
    <Grid
      container
      direction="column"
      spacing={1}
      component="ul"
      sx={{
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
      }}>
      {pipe(
        AmakeBy(3, (index) => index),
        Amap((index) => (
          <Grid key={index} item>
            <LoadingDisplay rows={2} height={40} />
          </Grid>
        )),
      )}
    </Grid>
  </Container>
)

const LatestPapersError = ({ refetch }: LatestPapersErrorProperties) => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
    direction="column"
    sx={{
      height: "300px",
      textAlign: "left",
      paddingBottom: "10px",
      backgroundColor: "#eff8fb",
      color: "#04313f",
      borderRadius: "15px",
      boxSizing: "border-box",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    }}>
    <Grid item>
      <Typography
        color="error"
        sx={{
          fontStyle: "italic",
          color: "#75746f",
        }}>
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

const LatestPapersTitle = () => (
  <Box
    sx={{
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
    }}>
    <Grid container>
      <Typography
        sx={{
          paddingLeft: "5px",
          color: "#086a87",
          fontSize: "20px",
          verticalAlign: "top",
          textAlign: "left",
        }}>
        <FontAwesomeIcon icon="paperclip" size="sm" />
      </Typography>
      <span
        style={{
          paddingLeft: "5px",
          color: "#086a87",
          fontSize: "20px",
          verticalAlign: "top",
          textAlign: "left",
        }}>
        LATEST PAPERS
      </span>
    </Grid>
  </Box>
)

const MorePapersLink = () => (
  <Link to="/papers">
    <Button
      endIcon={<DoubleArrowIcon />}
      sx={(theme: Theme) => ({
        color: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: "inherit",
          color: "red",
        },
      })}>
      <Typography variant="h2"> More Papers </Typography>
    </Button>
  </Link>
)

const LatestPapersView = ({ data }: LatestPapersProperties) => (
  <Container
    maxWidth={false}
    sx={{
      textAlign: "left",
      paddingBottom: "10px",
      backgroundColor: "#eff8fb",
      color: "#04313f",
      borderRadius: "15px",
      boxSizing: "border-box",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    }}>
    <LatestPapersTitle />
    <Grid
      container
      direction="column"
      component="ul"
      sx={{
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
      }}>
      {pipe(
        data,
        AtakeLeft(5),
        Amap((p) => <LatestPaperItem key={p.pubmedId} data={p} />),
      )}
    </Grid>
    <Grid
      container
      justifyContent="flex-end"
      sx={{
        fontWeight: "normal",
        paddingBottom: "10px",
      }}>
      <Grid item>
        <MorePapersLink />
      </Grid>
    </Grid>
  </Container>
)

export { LatestPapersView, LatestPapersLoader, LatestPapersError }
