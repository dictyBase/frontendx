import React, { useState } from "react"
import { pipe } from "fp-ts/function"
import {
  upsertAt as RupsertAt,
  map as Rmap,
  toArray as RtoArray,
} from "fp-ts/Record"
import {
  map as Amap,
  sort as Asort,
  filter as Afilter,
  concat as Aconcat,
  prepend as Aprepend,
} from "fp-ts/Array"
import { map as Mmap } from "fp-ts/Map"
import { Ord, contramap } from "fp-ts/Ord"
import { Ord as NOrd } from "fp-ts/number"
import { Ord as SOrd } from "fp-ts/string"
import { snd as Tsnd, fst as Tfst, mapSnd as TmapSnd } from "fp-ts/Tuple"
import { Container, Grid, Box, Typography, Tab, Tabs } from "@material-ui/core"
import { TabPanel } from "@dictybase/ui-dsc/src/catalog/TabPanel"
import { makeStyles } from "@material-ui/core/styles"
import { SinglePublication } from "./SinglePublication"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

type PublicationsViewProperties = {
  data: Array<PublicationItem>
}

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
  header: {
    color: "black",
    fontSize: "20px",
    padding: "15px 30px 15px 35px",

    "@media (max-width: 767px)": {
      fontSize: "24px",
      textAlign: "right",
      padding: "20px 5px 20px 15px",
    },
  },
})

const createPublishDatePredicate =
  (timeInSeconds: number) => (item: PublicationItem) =>
    (Date.now() - new Date(item.publishDate).getTime()) / 1000 < timeInSeconds

const timeIntervalsToSeconds = {
  "Past Three Days": 3 * 24 * 60 * 60,
  "Past Week": 7 * 24 * 60 * 60,
  "Past Month": 31 * 24 * 60 * 60,
  "Past Three Months": 3 * 31 * 24 * 60 * 60,
}

const ordByTime: Ord<
  [keyof typeof timeIntervalsToSeconds, Array<PublicationItem>]
> = pipe(
  NOrd,
  contramap((tuple) => timeIntervalsToSeconds[Tfst(tuple)]),
)

const PublicationsView = ({ data }: PublicationsViewProperties) => {
  const sortedPublications = pipe(
    timeIntervalsToSeconds,
    Rmap((time) => createPublishDatePredicate(time)),
    RtoArray,
    Amap(TmapSnd((predicate) => Afilter(predicate)(data))),
    Asort(ordByTime),
    Aprepend(["All", data] as [string, Array<PublicationItem>]),
  )
  const [tab, setTab] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue)
  }

  const { container, listBox, header } = useStyles()
  return (
    <Container className={container}>
      <Box className={header}>
        <Typography variant="h1" align="center">
          Latest Publications
        </Typography>
      </Box>
      <Tabs value={tab} onChange={handleChange}>
        {sortedPublications.map((interval) => (
          <Tab label={Tfst(interval)} />
        ))}
      </Tabs>
      <Grid
        container
        spacing={2}
        direction="column"
        component="ol"
        className={listBox}>
        {sortedPublications[tab][1].map((p) => (
          <Grid key={p.pubmedId} item>
            <SinglePublication data={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export { PublicationsView }
