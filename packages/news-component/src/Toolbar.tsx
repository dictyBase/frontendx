import { Toolbar, Paper, Checkbox } from "@material-ui/core"
import { useLocation, useParams } from "react-router-dom"
import { useAtomValue } from "jotai"
import { selectedArticlesAtom } from "./atomConfigs"
import CreateButton from "./CreateButton"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import { getURLPathSegments } from "./utils"

const NewsToolbar = () => {
  const selectedArticles = useAtomValue(selectedArticlesAtom)
  const location = useLocation()
  const { slug } = useParams()
  const paths = getURLPathSegments(location.pathname)
  const lastPathSegment = paths.at(-1)

  return (
    <Paper>
      <Toolbar disableGutters variant="dense">
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
