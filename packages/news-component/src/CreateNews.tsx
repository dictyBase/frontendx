import { useState, ChangeEvent } from "react"
import { Grid, Container, TextField } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { Editor } from "@dictybase/editor"
import { NewsHeader } from "./NewsHeader"
import { useCreateNews } from "./useCreateNews"

const CreateNews = () => {
  const [title, setTitle] = useState("")
  const { handleCreate } = useCreateNews(title)
  const navigate = useNavigate()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
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
            handleSave={handleCreate}
            handleCancel={handleCancel}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export { CreateNews }
