import { useNavigate } from "react-router-dom"
import { Container, } from "@material-ui/core"
import { Editor } from "@dictybase/editor"
import { ACCESS } from "@dictybase/auth"
import { CreateContentForm } from "../../features/EditablePages/CreateContentForm"

const CreateContentView = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Editor editable toolbar={<CreateContentForm />} />
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default CreateContentView
export const access = ACCESS.private
export const roles = ["content-admin"]
