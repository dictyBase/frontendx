import Grid from "@material-ui/core/Grid"
import { Editor } from "editor"
import { JsonPlugin } from "@dictybase/json-plugin"

const saveJson = async (data: any) => {
  console.log(data)
  await fetch("/save", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}
const App = () => (
  <Grid container>
    <Grid item>
      <Editor editable plugins={[<JsonPlugin callback={saveJson} />]} />
    </Grid>
  </Grid>
)

export { App }
