import { useState, ChangeEvent } from "react"
import { Grid, Container, TextField } from "@material-ui/core"
import NewsHeader from "./NewsHeader"
import CreateNews from "./CreateNews"
import UpdateNews from "./UpdateNews"

type WriteNewsProperties = {
  isUpdating: boolean
}

const WriteNews = ({ isUpdating }: WriteNewsProperties) => {
  const [title, setTitle] = useState("")

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
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
        <Grid item>{isUpdating ? <UpdateNews /> : <CreateNews />}</Grid>
      </Grid>
    </Container>
  )
}

export default WriteNews
