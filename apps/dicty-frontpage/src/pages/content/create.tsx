import { Container } from "@mui/material"
import { Editor } from "@dictybase/editor"
import { ACCESS } from "@dictybase/auth-mui5"
import { CreateContentForm } from "../../features/EditablePages/CreateContentForm"

const CreateContentView = () => (
  <Container>
    <Editor editable toolbar={<CreateContentForm />} />
  </Container>
)

// eslint-disable-next-line import/no-default-export
export default CreateContentView
export const access = ACCESS.private
export const roles = ["content-admin"]
