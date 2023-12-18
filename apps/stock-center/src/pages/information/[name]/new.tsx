import Container from "@material-ui/core/Container"
import { Editor } from "editor"
import { ACCESS } from "auth"
// import { InfoPageContainer } from "frontpage-components"

const Add = () => (
  <Container>
    <Editor editable />
  </Container>
)

// eslint-disable-next-line import/no-default-export
export default Add
export const access = ACCESS.private
export const roles = ["user-user", "content-admin"]
