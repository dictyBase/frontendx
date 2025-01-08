import { Editor, EditorContainer } from "@dictybase/editor"
import { ACCESS } from "@dictybase/auth"
import { CreateContentForm } from "../../features/EditablePages/CreateContentForm"

const CreateContentView = () => (
  <EditorContainer>
    <Editor editable toolbar={<CreateContentForm />} />
  </EditorContainer>
)

// eslint-disable-next-line import/no-default-export
export default CreateContentView
export const access = ACCESS.private
export const roles = ["content-admin"]
