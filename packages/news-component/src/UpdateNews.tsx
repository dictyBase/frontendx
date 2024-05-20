import { useState, ChangeEvent } from "react"
import { Grid, Container, TextField } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { Editor } from "@dictybase/editor"
import { useUpdateNews } from "./useUpdateNews"
import { useInitialContentData } from "./useInitialContentData"

const UpdateNews = () => {
  const initialData = useInitialContentData()
  const [title, setTitle] = useState(initialData?.name || "")
  const navigate = useNavigate()
  const { handleUpdate } = useUpdateNews(
    initialData?.id,
    initialData?.slug,
    title,
  )

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleCancel = () => {
    navigate("/news")
  }

  if (!initialData) return <div>Fallback</div>
  return (
    <Container>
      <Grid container direction="column" spacing={3}>
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
            content={{
              storageKey: initialData?.slug,
              editorState: initialData?.content,
            }}
            handleSave={handleUpdate}
            handleCancel={handleCancel}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export { UpdateNews }
