import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import { Editor } from "editor"
// import { InfoPageContainer } from "frontpage-components"

const InfoPageContainer = () => (
  <Container>
    <Paper>
      <Editor editable={false} />
    </Paper>
  </Container>
)

// eslint-disable-next-line import/no-default-export
export default InfoPageContainer
