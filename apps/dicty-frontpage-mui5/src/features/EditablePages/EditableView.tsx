import { makeStyles, Container, Button } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import { useNavigate } from "react-router-dom"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "@dictybase/editor"
import { ActionBar } from "@dictybase/ui-common-mui5"
import { timeSince } from "../../common/utils/timeSince"
import { truncateEmail } from "../../common/utils/truncateEmail"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

type EditableActionBarProperties = {
  editedBy: string
  updatedAt: string
}

const EditableActionBar = ({
  editedBy,
  updatedAt,
}: EditableActionBarProperties) => {
  const navigate = useNavigate()
  return (
    <ActionBar
      descriptionElement={
        <>
          <strong>
            <PersonIcon /> {editedBy}
          </strong>{" "}
          edited {timeSince(updatedAt)} ago
        </>
      }>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("../edit", { relative: "path" })}>
        Edit
      </Button>
    </ActionBar>
  )
}

type EditableViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditableView = ({ data }: EditableViewProperties) => {
  const { updated_at, updated_by, content, slug } = data
  const editedBy = truncateEmail(updated_by.email)
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Editor
        toolbar={
          <EditableActionBar editedBy={editedBy} updatedAt={updated_at} />
        }
        editable={false}
        content={{ storageKey: slug, editorState: content }}
      />
    </Container>
  )
}

export { EditableView }
