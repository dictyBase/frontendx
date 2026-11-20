import { useNavigate } from "react-router-dom"
import { Container, Button, Typography } from "@mui/material"
import { ACCESS } from "@dictybase/auth-mui5"
import { Editor } from "@dictybase/editor"
import { ActionBar } from "@dictybase/ui-common"
import { CreateButton } from "../../common/components/CreateButton"
import { NEWS_NAMESPACE } from "../../common/constants/namespace"

const Create = () => {
  const navigate = useNavigate()
  const newsContentName = crypto.randomUUID()

  const handleCancel = async () => {
    navigate("/news/editable")
  }

  const actionBar = (
    <ActionBar descriptionElement={<Typography>Write News</Typography>}>
      <CreateButton namespace={NEWS_NAMESPACE} name={newsContentName} />
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    </ActionBar>
  )
  return (
    <Container sx={{ marginTop: 2, marginBottom: 4 }}>
      <Editor editable toolbar={actionBar} />
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default Create
export const roles = ["content-admin"]
export const access = ACCESS.private
