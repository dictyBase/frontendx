import { Container } from "@material-ui/core"
import { Editor } from "@dictybase/editor"
import { ACCESS } from "@dictybase/auth"
import { useConfirmNavigation } from "@dictybase/hook"
import { CreateContentForm } from "../../components/CreateContentForm"

const toolbar = <CreateContentForm />

const CreateContentView = () => {
  useConfirmNavigation()
  return (
    <Container>
      <Editor editable toolbar={toolbar} />
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default CreateContentView
export const access = ACCESS.private
export const roles = ["content-admin"]
