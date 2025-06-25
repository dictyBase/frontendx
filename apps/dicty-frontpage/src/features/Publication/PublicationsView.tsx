import { ChangeEventHandler, useState, useEffect } from "react"
import { pipe } from "fp-ts/function"
import { split as Ssplit, Ord as SOrd, isEmpty as SisEmpty } from "fp-ts/string"
import {
  sort as Asort,
  map as Amap,
  mapWithIndex as AmapWithIndex,
  reduce as Areduce,
  prepend as Aprepend,
  isNonEmpty as AisNonEmpty,
  sequence,
  some as Asome,
} from "fp-ts/Array"
import { filter as RAfilter } from "fp-ts/ReadonlyArray"
import { map as NEAmap } from "fp-ts/NonEmptyArray"
import {
  tryCatch as TEtryCatch,
  ApplicativePar,
  map as TEmap,
  match as TEmatch,
} from "fp-ts/TaskEither"
import { map as Rmap, keys as Rkeys } from "fp-ts/Record"
import { MLCEngineInterface, Embedding } from "@mlc-ai/web-llm"
import { DictyTab, DictyTabs } from "@dictybase/ui-common"
import { Ord, contramap, reverse as ORDreverse } from "fp-ts/Ord"
import { Ord as NOrd } from "fp-ts/number"
import {
  IconButton,
  Container,
  Box,
  Typography,
  TextField,
} from "@material-ui/core"
import FilterListIcon from "@material-ui/icons/FilterList"
import { grey } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles"
import { PublicationsList } from "./PublicationsList"
import { useMLCEngine } from "./useMLCEngine"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"

type Vector = Array<number>

const dotProduct = (a: Vector, b: Vector) => {
  if (a.length !== b.length)
    throw new Error(
      "Input vectors of a dot product must have the same dimensionality.",
    )
  return pipe(
    a,
    AmapWithIndex((index) => a[index] * b[index]),
    Areduce(0, (sum, element) => sum + element),
  )
}

const magnitude = (v: Vector) =>
  pipe(
    v,
    Amap((n) => n ** 2),
    Areduce(0, (sum, element) => sum + element),
    Math.sqrt,
  )

const cosineSimilarity = (a: Vector, b: Vector) =>
  dotProduct(a, b) / (magnitude(a) * magnitude(b))

const useStyles = makeStyles((theme) => ({
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
}))

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
    const shuffled: Array<PublicationItem> = new Array(publications.length)
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

type PublicationWithEmbeddings = {
  id: string
  embeddings: Array<Embedding>
}

const TEgetEmbedding = (engine: MLCEngineInterface) => (input: Array<string>) =>
  TEtryCatch(
    () => engine.embeddings.create({ input }),
    (reason) => new Error(reason as string),
  )

const getPublicationEmbeddings =
  (engine: MLCEngineInterface) =>
  ({ pubmedId, title, abstract }: PublicationItem) =>
    pipe(
      abstract,
      Ssplit("."),
      RAfilter((sentence) => !SisEmpty(sentence)),
      (rnea) => [...rnea],
      Aprepend(title),
      TEgetEmbedding(engine),
      TEmap(
        ({ data }): PublicationWithEmbeddings => ({
          id: pubmedId,
          embeddings: data,
        }),
      ),
    )

const hasSimilarEmbedding =
  (input: Vector, threshold: number) =>
  ({ embeddings }: PublicationWithEmbeddings) =>
    pipe(
      embeddings,
      Asome(({ embedding }) => cosineSimilarity(input, embedding) >= threshold),
    )
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
  const { engine } = useMLCEngine()
  const [search, setSearch] = useState("")
  const [embeddings, setEmbeddings] = useState<
    Array<PublicationWithEmbeddings>
  >([])

  useEffect(() => {
    const createEmbeddings = async () => {
      if (!engine) return
      if (!AisNonEmpty(data)) return
      pipe(
        data,
        NEAmap(getPublicationEmbeddings(engine)),
        sequence(ApplicativePar),
        TEmatch(
          (error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          },
          (result) => {
            setEmbeddings(result)
          },
        ),
      )()
    }
    createEmbeddings()
  }, [engine, data])

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setSearch(value)
  }

  const handleChange = (
    _: React.ChangeEvent<{}>,
    newValue: keyof typeof orderFunctions,
  ) => {
    setCurrentTab(newValue)
  }

  const { background, container, header } = useStyles()
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
        <TextField
          value={search}
          placeholder="Semantic Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <IconButton disabled>
                <FilterListIcon />
              </IconButton>
            ),
          }}
          onChange={handleSearchChange}
        />
        <PublicationsList
          sortedPublications={sortedPublications}
          currentTab={currentTab}
        />
      </Container>
    </Box>
  )
}

export { PublicationsView }
