import { useNavigate } from "react-router-dom"
import { Button, Typography } from "@material-ui/core"
import { Editor } from "@dictybase/editor"
import { ActionBar } from "@dictybase/ui-common"
import { CreateButton } from "./CreateButton"

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
    navigate("../notfoundauth", { relative: "path" })
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
  return <Editor editable toolbar={actionBar} />
}

export { AddPageView }
