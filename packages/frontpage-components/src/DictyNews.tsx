import {
  Container,
  Typography,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core"
import AnnouncementIcon from "@material-ui/icons/Announcement"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { makeBy as AmakeBy, map as Amap } from "fp-ts/Array"

const useDictyNewsStyles = makeStyles((theme) => ({
  root: {},
  main: {
    height: "440px",
  },
  top: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  middle: {
    boxShadow: "inset 0px -2px",
  },
  bottom: {
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  newsListItem: {
    overflow: "auto",
  },
  link: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "inherit",
      color: "red",
    },
  },
  newsIcon: {
    display: "block",
  },
}))

const DictyNewsTitle = () => {
  const { newsIcon } = useDictyNewsStyles()
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <Typography variant="h1">Dicty News</Typography>
      </Grid>
      <Grid item>
        <AnnouncementIcon className={newsIcon} />
      </Grid>
    </Grid>
  )
}

const NewsList = () => (
  <Grid container spacing={1} direction="column">
    {pipe(
      AmakeBy(7, (index) => index),
      Amap((key) => (
        <Grid key={key} item>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Grid>
      )),
    )}
  </Grid>
)

const MoreNewsLink = () => {
  const { link } = useDictyNewsStyles()
  return (
    <Grid justifyContent="flex-end" container>
      <Grid item>
        <Link to="/#">
          <Button className={link} endIcon={<DoubleArrowIcon />}>
            <Typography variant="h2"> More News </Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

const DictyNews = () => {
  const { root, main, newsListItem } = useDictyNewsStyles()
  return (
    <Container className={root}>
      <Grid
        direction="column"
        spacing={1}
        container
        wrap="nowrap"
        className={main}>
        <Grid item>
          <DictyNewsTitle />
        </Grid>
        <Grid item className={newsListItem}>
          <NewsList />
        </Grid>
        <Grid item>
          <MoreNewsLink />
        </Grid>
      </Grid>
    </Container>
  )
}

export { DictyNews }
