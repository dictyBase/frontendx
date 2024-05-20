import { useState, useEffect, ChangeEvent } from "react"
import { Paper, Typography, Grid, Checkbox } from "@material-ui/core"
import { Link } from "react-router-dom"
import { parseContentToText } from "@dictybase/editor"
import { useSetAtom } from "jotai"
import { useNewsPreviewStyles } from "./useNewsPreviewStyles"
import { formatDateISOString } from "./utils"
import {
  addSelectedArticlesAtom,
  removeSelectedArticlesAtom,
} from "./atomConfigs"

type NewsPreviewProperties = {
  article: {
    id: string
    slug: string
    name: string
    updatedAt: string
    content: string
  }
  selectable?: boolean
}

const NewsPreview = ({
  article,
  selectable = false,
}: NewsPreviewProperties) => {
  const addToSelected = useSetAtom(addSelectedArticlesAtom)
  const removefromSelected = useSetAtom(removeSelectedArticlesAtom)
  const [selected, setSelected] = useState(false)
  const { root, checkbox } = useNewsPreviewStyles()
  const previewText = `${parseContentToText(article.content).slice(0, 250)}...`

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    setSelected(event.target.checked)
  }

  useEffect(() => {
    if (selected) addToSelected(article.slug)
    if (!selected) removefromSelected(article.slug)
  }, [selected, addToSelected, removefromSelected, article.slug])

  return (
    <Paper className={root}>
      <Grid container direction="row" wrap="nowrap">
        {selectable ? (
          <Grid item>
            <Checkbox
              checked={selected}
              onChange={onChange}
              className={checkbox}
            />
          </Grid>
        ) : (
          <></>
        )}
        <Grid item>
          <>
            <Link to={article.slug}>
              <Typography variant="h2">{article.name}</Typography>
            </Link>
            <Typography>{formatDateISOString(article.updatedAt)}</Typography>
            <Typography>{previewText}</Typography>
          </>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { NewsPreview }
