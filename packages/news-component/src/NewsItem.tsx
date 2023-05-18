import { Container } from "@material-ui/core"
import type { Content } from "dicty-graphql-schema"
import { Editor } from "dicty-editor"
import useNewsItemStyles from "./useNewsItemStyles"

type NewsItemProperties = {
  article: Content
}

const NewsItem = ({ article }: NewsItemProperties) => {
  const { root } = useNewsItemStyles()

  return (
    <Container disableGutters className={root}>
      <Editor
        editable={false}
        content={{ storageKey: article.slug, editorState: article.content }}
      />
    </Container>
  )
}

export default NewsItem
