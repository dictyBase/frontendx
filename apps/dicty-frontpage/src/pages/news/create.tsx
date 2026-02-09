import { useNavigate } from "react-router-dom"
import { Container, Button, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { ACCESS } from "@dictybase/auth-mui5"
import { Editor } from "@dictybase/editor"
import { ActionBar } from "@dictybase/ui-common"
import { CreateButton } from "../../common/components/CreateButton"
import { NEWS_NAMESPACE } from "../../common/constants/namespace"

const useStyles = makeStyles()((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

const Create = () => {
  const { classes } = useStyles()
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
    <Container className={classes.container}>
      <Editor editable toolbar={actionBar} />
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default Create
export const roles = ["content-admin"]
export const access = ACCESS.private
