import { useNavigate } from "react-router-dom"
import {
  Button,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core"
import { CreateContentForm, ActionBar } from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import { ACCESS } from "@dictybase/auth"
import { CreateButton } from "../../common/components/CreateButton"

type AddPageViewProperties = {
  namespace: string
  name: string
  contentPath: string
}

const AddPageView = ({
  namespace,
  name,
  contentPath,
}: AddPageViewProperties) => {
  const navigate = useNavigate()

  const handleCancel = async () => {
    navigate("/content", { relative: "path" })
  }

  const actionBar = (
    <ActionBar
      descriptionElement={
        <Typography>{`Add Editable Page for Route: ${contentPath}`}</Typography>
      }>
      <CreateButton namespace={namespace} name={name} />
      <Button onClick={handleCancel}> Cancel </Button>
    </ActionBar>
  )
  return (
    <Container>
      <Editor editable toolbar={<CreateContentForm />} />
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default AddPageView
export const access = ACCESS.private
export const roles = ["content-admin"]
