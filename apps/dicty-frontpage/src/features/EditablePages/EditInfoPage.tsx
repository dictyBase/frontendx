import { useNavigate, useLocation } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import { useUpdateContentMutation } from "dicty-graphql-schema"
import { Editor } from "editor"
import { useAuthStore } from "../Authentication/AuthStore"
import useAuthorization from "../../common/hooks/useAuthorization"
import Fallback from "../../common/components/Fallback"

const useStyles = makeStyles((theme: Theme) => ({
  editor: {
    "& a": {
      cursor: "pointer",
    },
  },
  button: {
    minWidth: "70px",
    textTransform: "none",
    marginRight: theme.spacing(1),
  },
}))

/**
 * Allows editing of the info page components
 */
const EditInfoPage = () => {
  /* Instead of passing props, we need to use useParams hook */
  const location = useLocation()

  const classes = useStyles()
  const {
    state: { token },
  } = useAuthStore()

  const {
    state: { data },
  } = location
  const { user } = useAuthorization()
  const [updateContent] = useUpdateContentMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const navigate = useNavigate()

  const { pathname } = location
  const previousURL = pathname.slice(0, -5)

  const handleSaveClick = async (value: string) => {
    if (data?.id === undefined) {
      return
    }
    await updateContent({
      variables: {
        input: {
          id: data.id,
          name: data.name,
          slug: data.slug,
          updatedBy: user.id,
          content: value,
        },
      },
    })
    navigate(previousURL)
  }

  const handleCancelClick = () => {
    navigate(previousURL)
  }

  if (!data) return <Fallback />

  return (
    <Container maxWidth="lg">
      <Box mt={2} className={classes.editor}>
        <Editor
          content={{ storageKey: data.slug, editorState: data.content }}
          editable
          handleCancel={handleCancelClick}
          handleSave={handleSaveClick}
        />
      </Box>
    </Container>
  )
}

export default EditInfoPage
