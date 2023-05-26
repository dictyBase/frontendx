import { Toolbar, Paper, Checkbox } from "@material-ui/core"
import { useLocation, useParams } from "react-router-dom"
import { useAtomValue } from "jotai"
import { selectedArticlesAtom } from "./atomConfigs"
import { ListNewsContentQueryResult } from "dicty-graphql-schema"
import CreateButton from "./CreateButton"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import useToolbarStyles from "./useToolbarStyles"
import { getURLPathSegments } from "./utils"

type NewsToolbarProperties = {
  refetch: ListNewsContentQueryResult["refetch"]
}

const NewsToolbar = ({ refetch }) => {
  const { root } = useToolbarStyles()
  const selectedArticles = useAtomValue(selectedArticlesAtom)
  const location = useLocation()
  const { slug } = useParams()
  const paths = getURLPathSegments(location.pathname)
  const lastPathSegment = paths.at(-1)

  return (
    <Paper>
      <Toolbar disableGutters variant="dense" className={root}>
        {lastPathSegment === "news" ? (
          <>
            <Checkbox />
            <CreateButton />
          </>
        ) : (
          <></>
        )}
        {slug ? <EditButton slug={slug} /> : <></>}
        {selectedArticles.length > 0 ? <DeleteButton /> : <></>}
      </Toolbar>
    </Paper>
  )
}

export default NewsToolbar
