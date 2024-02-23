import React, { useState } from "react"
import { pipe } from "fp-ts/function"
import { DictyTab, DictyTabs } from "@dictybase/ui-common"
import { map as Rmap, keys as Rkeys } from "fp-ts/Record"
import { sort as Asort, filter as Afilter } from "fp-ts/Array"
import { Ord, contramap } from "fp-ts/Ord"
import { Ord as NOrd } from "fp-ts/number"
import { Container, Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { PublicationsList } from "./PublicationsList"
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
    "@media (max-width: 768px)": {
      padding: "0 0 0 0",
    },
  },

  header: {
    color: "black",
    fontSize: "20px",
    padding: "15px 35px 15px 35px",

    "@media (max-width: 767px)": {
      fontSize: "24px",
      textAlign: "right",
      padding: "20px 5px 20px 15px",
    },
  },
})

const olderThanPredicate = (timeInSeconds: number) => (item: PublicationItem) =>
  (Date.now() - new Date(item.publishDate).getTime()) / 1000 > timeInSeconds

const timeIntervalsToSeconds = {
  All: 0,
  "Older Than One Week": 7 * 24 * 60 * 60,
  "Older Than One Month": 31 * 24 * 60 * 60,
  "Older Than Three Months": 3 * 31 * 24 * 60 * 60,
}

const ordByTime: Ord<keyof typeof timeIntervalsToSeconds> = pipe(
  NOrd,
  contramap((key) => timeIntervalsToSeconds[key]),
)

const PublicationsView = ({ data }: PublicationsViewProperties) => {
  const sortedPublications = pipe(
    timeIntervalsToSeconds,
    Rmap((time) => Afilter(olderThanPredicate(time))(data)),
  )
  const tabs = pipe(timeIntervalsToSeconds, Rkeys, Asort(ordByTime))

  const [currentTab, setCurrentTab] = useState(tabs[0])

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: keyof typeof timeIntervalsToSeconds,
  ) => {
    setCurrentTab(newValue)
  }

  const { container, header } = useStyles()
  return (
    <Container className={container}>
      <Box className={header}>
        <Typography variant="h1" align="center">
          Latest Publications
        </Typography>
      </Box>
      <DictyTabs value={currentTab} onChange={handleChange}>
        {tabs.map((value) => (
          <DictyTab value={value} label={value} key={value} />
        ))}
      </DictyTabs>
      <PublicationsList
        sortedPublications={sortedPublications}
        currentTab={currentTab}
      />
    </Container>
  )
}

export { PublicationsView }
