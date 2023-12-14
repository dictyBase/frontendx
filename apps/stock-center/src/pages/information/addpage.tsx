import Container from "@material-ui/core/Container"
import { Editor } from "editor"
import { ACCESS } from "auth"
// import { InfoPageContainer } from "frontpage-components"

const AddPage = () => (
  <Container>
    <Editor editable />
  </Container>
)

// eslint-disable-next-line import/no-default-export
export default AddPage
export const access = ACCESS.private
export const roles = ["user-user", "content-admin"]
