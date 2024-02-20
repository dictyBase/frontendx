import { useState } from "react"
import { pipe } from "fp-ts/function"
import {
  upsertAt as RupsertAt,
  map as Rmap,
  toArray as RtoArray,
} from "fp-ts/Record"
import { sort as Asort } from "fp-ts/Array"
import { Ord, contramap } from "fp-ts/Ord"
import { Ord as NOrd } from "fp-ts/number"
import { map as Mmap } from "fp-ts/Map"
import { snd as Tsnd } from "fp-ts/Tuple"

import { filter as Afilter, sort } from "fp-ts/Array"
import { bindTo as ObindTo, bind as Obind, let as Olet } from "fp-ts/Option"
import { bindTo as IbindTo, bind as Ibind, let as Ilet } from "fp-ts/Identity"
import {
  Container,
  Grid,
  Box,
  Typography,
  Tabs,
  TabPanel,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { SinglePublication } from "./SinglePublication"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

type PublicationsViewProperties = {
  data: Array<PublicationItem>
}
const createPublishDatePredicate =
  (timeInSeconds: number) => (item: PublicationItem) =>
    new Date(item.publishDate).getTime() / 1000 < timeInSeconds

// const TimeIntervalsToSeconds = new Map([
//   ["All", () => true],
//   ["Last Three Days", createPublishDatePredicate(3 * 24 * 60 * 60)],
//   ["Last Week", createPublishDatePredicate(7 * 24 * 60 * 60)],
//   ["Last Month", createPublishDatePredicate(31 * 24 * 60 * 60)],
// ])
// const TimeIntervalsToSeconds = {
//   all: {
//     text: "All",
//     predicate: () => true,
//   },
//   threeDays: {
//     text: "Last Three Days",
//     predicate: createTimePredicate(3 * 24 * 60 * 60),
//   },
//   oneWeek: {
//     text: "Last Week",
//     predicate: createTimePredicate(7 * 24 * 60 * 60),
//   },
//   oneMonth: {
//     text: "Last Month",
//     predicate: createTimePredicate(31 * 24 * 60 * 60),
//   },
// }

const useStyles = makeStyles({
  container: {
    textAlign: "left",
    padding: "0px 6rem 1rem 6rem",
    // backgroundColor: "#eff8fb",
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
    marginBottom: "5px",
    marginTop: "12px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
  },
})

const timeIntervalsToSeconds = {
  "Last Three Days": 3 * 24 * 60 * 60,
  "Last Week": 7 * 24 * 60 * 60,
  "Last Month": 31 * 24 * 60 * 60,
}

const ordByTime: Ord<[string, number]> = pipe(
  NOrd,
  contramap((tuple) => Tsnd(tuple)),
)

const PublicationsView = ({ data }: PublicationsViewProperties) => {
  const sortedPublications = pipe(
    timeIntervalsToSeconds,
    Rmap((seconds) => Afilter(createPublishDatePredicate(seconds))(data)),
    RupsertAt("All", data),
  )
  const orderedTimeIntervals = pipe(
    timeIntervalsToSeconds,
    RtoArray,
    Asort(ordByTime),
  )
  const [timeFrame, setTimeFrame] =
    useState<keyof typeof sortedPublications>("all")

  const { container, listBox, header } = useStyles()
  return (
    <Container className={container}>
      <Box className={header}>
        <Typography variant="h1" align="center">
          Latest Publications
        </Typography>
      </Box>
      <>{}</>
      <Grid
        container
        spacing={2}
        direction="column"
        component="ol"
        className={listBox}>
        {sortedPublications[timeFrame].data.map((p) => (
          <Grid key={p.pubmedId} item>
            <SinglePublication data={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export { PublicationsView }
