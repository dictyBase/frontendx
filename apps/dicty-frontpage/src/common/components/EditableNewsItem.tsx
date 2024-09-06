import { ChangeEvent } from "react"
import { useAtom } from "jotai"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  elem as Aelem,
  uniq as Auniq,
  filter as Afilter,
  append as Aappend,
} from "fp-ts/Array"
import { Eq as SEq } from "fp-ts/string"
import { selectedNewsArticlesAtom } from "../../state"
import { Typography, Grid, Checkbox } from "@material-ui/core"
import { Link } from "react-router-dom"
import { parseISO, format } from "date-fns/fp"
import { parseContentToText } from "@dictybase/editor"
import { truncateString } from "../utils/truncateString"

type NewsItemProperties = {
  id: string
  name: string
  content: string
  updated_at: string
}

const EditableNewsItem = ({
  id,
  name,
  content,
  updated_at,
}: NewsItemProperties) => {
  const [selectedNewsArticles, setSelectedNewsArticles] = useAtom(
    selectedNewsArticlesAtom,
  )
  const isChecked = pipe(selectedNewsArticles, Aelem(SEq)(id))

  const addToSelected = () => {
    setSelectedNewsArticles(pipe(selectedNewsArticles, Aappend(id), Auniq(SEq)))
  }

  const removeFromSelected = () => {
    setSelectedNewsArticles(
      pipe(
        selectedNewsArticles,
        Afilter((e) => e !== id),
      ),
    )
  }

  const handleChange = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    pipe(checked, Bmatch(removeFromSelected, addToSelected))
  }

  return (
    <Grid container direction="row" wrap="nowrap">
      <Grid item>
        <Checkbox checked={isChecked} onChange={handleChange} />
      </Grid>
      <Grid item>
        <Link to={`../news/${name}/editable`}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h2">
                {pipe(updated_at, parseISO, format("PPPP"))}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textPrimary">
                {truncateString(parseContentToText(content), 400)}
              </Typography>
            </Grid>
          </Grid>
        </Link>
      </Grid>
    </Grid>
  )
}

export { EditableNewsItem }
