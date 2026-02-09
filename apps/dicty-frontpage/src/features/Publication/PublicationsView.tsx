import React, { useState } from "react"
import { pipe } from "fp-ts/function"
import { DictyTab, DictyTabs } from "@dictybase/ui-common"
import { map as Rmap, keys as Rkeys } from "fp-ts/Record"
import { sort as Asort } from "fp-ts/Array"
import { Ord, contramap, reverse as ORDreverse } from "fp-ts/Ord"
import { Ord as SOrd } from "fp-ts/string"
import { Ord as NOrd } from "fp-ts/number"
import { Container, Box, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { makeStyles } from 'tss-react/mui';
import {
  PublicationsList,
  type PublicationItem,
} from "@dictybase/ui-frontpage"

const useStyles = makeStyles()((theme) => ({
  background: {
    paddingTop: theme.spacing(2),
    backgroundColor: grey[50],
  },
  container: {
    textAlign: "left",
    padding: "0px 6rem 1rem 6rem",
    borderRadius: "15px",
    boxSizing: "border-box",
    marginBottom: "10px",
    "@media (max-width: 768px)": {
      padding: "0 0 0 0",
    },
  },

  header: {
    color: grey[800],
    fontSize: "20px",
    padding: "15px 35px 15px 35px",

    "@media (max-width: 767px)": {
      fontSize: "24px",
      textAlign: "right",
      padding: "20px 5px 20px 15px",
    },
  },
}));

const ordByOldest: Ord<PublicationItem> = pipe(
  NOrd,
  contramap((publicationItem) =>
    new Date(publicationItem.publishDate).getTime(),
  ),
)
const ordByNewest: Ord<PublicationItem> = pipe(ordByOldest, ORDreverse)
const ordByTitle: Ord<PublicationItem> = pipe(
  SOrd,
  contramap((publicationItem) => publicationItem.title),
)
const ordByTitleReverse: Ord<PublicationItem> = pipe(ordByTitle, ORDreverse)

const orderFunctions = {
  "Newest First": (publications: Array<PublicationItem>) =>
    pipe(publications, Asort(ordByNewest)),
  "Oldest First": (publications: Array<PublicationItem>) =>
    pipe(publications, Asort(ordByOldest)),
  "Title (A - Z)": (publications: Array<PublicationItem>) =>
    pipe(publications, Asort(ordByTitle)),
  "Title (Z - A)": (publications: Array<PublicationItem>) =>
    pipe(publications, Asort(ordByTitleReverse)),
  Shuffle: (publications: Array<PublicationItem>) => {
    // 1. assign unique random number from 0 to N -1 to each item in the array
    const shuffled: Array<PublicationItem> = Array.from({
      length: publications.length,
    })
    const getRandomIndex = () => Math.floor(Math.random() * publications.length)
    // 2. if a number has been rolled, re-roll
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < publications.length; index += 1) {
      let randomIndex = getRandomIndex()
      while (shuffled[randomIndex]) {
        randomIndex = (randomIndex + 1) % shuffled.length
      }
      shuffled[randomIndex] = publications[index]
    }
    return shuffled
  },
}

const tabOrder = {
  "Newest First": 0,
  "Oldest First": 1,
  "Title (A - Z)": 2,
  "Title (Z - A)": 3,
  Shuffle: 4,
}

const ordTab: Ord<keyof typeof orderFunctions> = pipe(
  NOrd,
  contramap((tabName) => tabOrder[tabName]),
)
/**
 * Represents a React component for displaying publications.
 * @param data - Array of PublicationItem objects.
 */
type PublicationsViewProperties = {
  data: Array<PublicationItem>
}

/**
 * Displays a list of publications. It renders tabs that allow
 * users to view a subset of the publications in a given time frame.
 */
const PublicationsView = ({ data }: PublicationsViewProperties) => {
  const sortedPublications = pipe(
    orderFunctions,
    Rmap((sortFunction) => sortFunction(data)),
  )
  const tabs = pipe(orderFunctions, Rkeys, Asort(ordTab))
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: keyof typeof orderFunctions,
  ) => {
    setCurrentTab(newValue)
  }

  const {
    background,
    container,
    header
  } = useStyles()
  return (
    <Box className={background}>
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
    </Box>
  )
}

export { PublicationsView }
