import { useNavigate } from "react-router-dom"
import { Container, Box } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { useCreateContentMutation } from "dicty-graphql-schema"
import { Editor } from "editor"
import { useSlug } from "../../common/hooks/useSlug"
import { useContentPath } from "../../common/hooks/useContentPath"
import { NAMESPACE } from "../../common/constants/namespace"

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    minHeight: "45px",
    textAlign: "center",
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    backgroundColor: "#eee",
    marginBottom: "20px",
  },
}))

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

type AddPageViewProperties = {
  userId: string
  token: string
}

/**
 * This is the view component so an authorized user can add a new page.
 */
const AddPageView = ({ userId, token }: AddPageViewProperties) => {
  const slug = useSlug()
  const contentPath = useContentPath()
  const navigate = useNavigate()
  const classes = useStyles()
  const [createContent] = useCreateContentMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const handleSaveClick = (value: any) => {
    createContent({
      variables: {
        input: {
          name: slug,
          // eslint-disable-next-line camelcase
          created_by: userId,
          content: JSON.stringify(value),
          namespace: NAMESPACE,
        },
      },
    })
    setTimeout(() => {
      navigate("../notfoundauth", { relative: "path" })
    }, 800)
  }

  const handleCancelClick = () => {
    navigate("../notfoundauth", { relative: "path" })
  }

  return (
    <Container>
      {/* {canEditPages && !verifiedToken && <ErrorNotification error={error} />} */}
      <Box mb={2} className={classes.banner}>
        <Box mb={2}>
          <Typography variant="h2" gutterBottom>
            Add Editable Page for Route:
          </Typography>
        </Box>
        <Typography variant="h3">{contentPath}</Typography>
      </Box>
      <Editor
        handleSave={handleSaveClick}
        handleCancel={handleCancelClick}
        editable
      />
    </Container>
  )
}

export { AddPageView }
