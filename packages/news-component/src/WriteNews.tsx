import { useState, ChangeEvent } from "react"
import { Grid, Container, TextField } from "@material-ui/core"
import slugify from "slugify"
import { useNavigate } from "react-router-dom"
import { useCreateContentMutation } from "dicty-graphql-schema"
import { Editor } from "dicty-editor"
import NewsHeader from "./NewsHeader"

const WriteNews = () => {
  const [title, setTitle] = useState("")
  const [createContent] = useCreateContentMutation()
  const navigate = useNavigate()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleSave = async (content: string) => {
    await createContent({
      variables: {
        input: {
          content,
          slug: slugify(title, { lower: true }),
          name: title,
          namespace: "news",
          createdBy: "george@vandelayindustries.com",
        },
      },
    })
    navigate(`/news`)
  }

  const handleCancel = () => {
    navigate("/news")
  }

  return (
    <Container>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <NewsHeader />
        </Grid>
        <Grid item>
          <TextField
            label="Article Title"
            placeholder="Article Title"
            onChange={onChange}
            value={title}
          />
        </Grid>
        <Grid item>
          <Editor
            editable
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default WriteNews
