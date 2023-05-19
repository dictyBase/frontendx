import { Container, Typography } from "@material-ui/core"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "dicty-editor"
import { useParams } from "react-router-dom"

const NewsPage = () => {
  const { id } = useParams()
  const { loading, error, data } = useContentBySlugQuery({
    variables: {
      slug: `news-${id}`,
    },
  })

  if (error) return <div> Error </div>
  if (loading) return <div> Loading </div>
  if (!data?.contentBySlug) return <div> Fallback </div>

  return (
    <Container>
      <Typography variant="h1">{data.contentBySlug.name}</Typography>
      <Typography>{data.contentBySlug.updatedAt}</Typography>
      <Editor
        editable={false}
        content={{
          storageKey: data.contentBySlug.slug,
          editorState: data.contentBySlug.content,
        }}
      />
    </Container>
  )
}

export default NewsPage
