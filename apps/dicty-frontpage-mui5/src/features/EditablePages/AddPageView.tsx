import { useNavigate } from "react-router-dom"
import { makeStyles, Container, Button, Typography } from "@material-ui/core"
import { Editor } from "@dictybase/editor"
import { ActionBar } from "@dictybase/ui-common"
import { CreateButton } from "../../common/components/CreateButton"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

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
  const classes = useStyles()
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
  return (
    <Container className={classes.container}>
      <Editor editable toolbar={actionBar} />
    </Container>
  )
}

export { AddPageView }
