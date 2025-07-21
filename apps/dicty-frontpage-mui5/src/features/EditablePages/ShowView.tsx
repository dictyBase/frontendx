import { makeStyles, Container } from "@material-ui/core"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "@dictybase/editor"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

type ShowViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

/**
 * A React component that renders the a view for editable content pages.
 *
 * @returns The rendered ContentView component.
 */
const ShowView = ({ data }: ShowViewProperties) => {
  const { slug, content } = data
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Editor
        editable={false}
        content={{ storageKey: slug, editorState: content }}
      />
    </Container>
  )
}

export { ShowView }
