import { useState, useEffect, ChangeEvent } from "react"
import { Paper, Typography, Grid, Checkbox } from "@material-ui/core"
import { Link } from "react-router-dom"
import { parseContentToText } from "dicty-editor"
import { useSetAtom } from "jotai"
import useNewsPreviewStyles from "./useNewsPreviewStyles"
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
}

const NewsPreview = ({ article }: NewsPreviewProperties) => {
  const addToSelected = useSetAtom(addSelectedArticlesAtom)
  const removefromSelected = useSetAtom(removeSelectedArticlesAtom)
  const [selected, setSelected] = useState(false)
  const { root } = useNewsPreviewStyles()
  const previewText = `${parseContentToText(article.content).slice(0, 250)}...`

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    setSelected(event.target.checked)
  }

  useEffect(() => {
    if (selected) addToSelected(article.id)
    if (!selected) removefromSelected(article.id)
  }, [selected, addToSelected, removefromSelected, article.id])

  return (
    <Paper className={root}>
      <Grid container direction="row" wrap="nowrap">
        <Grid item>
          <Checkbox checked={selected} onChange={onChange} />
        </Grid>
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

export default NewsPreview
