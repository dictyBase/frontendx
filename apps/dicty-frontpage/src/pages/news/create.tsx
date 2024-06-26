import { useNavigate } from "react-router-dom"
import { useAuthorizedCreateContent } from "../../common/utils/useAuthorizedCreateContent"
import { Container, Grid, Box, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { FunctionComponent } from "react"
import { ACCESS } from "@dictybase/auth"
import { Editor } from "@dictybase/editor"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: "auto",
  },
  toolbar: {
    backgroundColor: "#fafafa",
    borderRadius: "2px",
    border: "1px solid #ddd",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "100%",
    alignItems: "center",
  },
  label: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    fontSize: "0.8rem",
    fontWeight: "bold",
    lineHeight: 1,
    color: "#fff",
    whiteSpace: "nowrap",
    borderRadius: "0.25em",
    backgroundColor: theme.palette.primary.light,
  },
  icon: {
    color: theme.palette.primary.light,
    fontSize: "1rem",
    marginRight: theme.spacing(0.5),
  },
  text: {
    color: theme.palette.primary.light,
  },
}))

const CreateNewsToolbar: FunctionComponent<{
  children: Array<JSX.Element>
}> = ({ children }) => {
  const { toolbar, text } = useStyles()
  return (
    <Grid
      container
      justifyContent="space-between"
      className={toolbar}
      data-testid="info-page-toolbar">
      <Grid item>
        <Box component="span" className={text}>
          <Typography>Write News</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          {children.map((child, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={index} item>
              {child}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

const CreateNews = () => {
  const navigate = useNavigate()
  const newsContentName = crypto.randomUUID()
  const authorizedCreateContent = useAuthorizedCreateContent("news", newsContentName)

  const handleSave = async (contentValue: string) => {
    // handle error / success state
    await authorizedCreateContent(contentValue)
    navigate("..", { relative: "path" })
  }

  const handleCancel = async () => {
    navigate("..", { relative: "path" })
  }

  return (
    <Container>
      <Editor
        editable
        toolbar={CreateNewsToolbar}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default CreateNews
export const roles = ["content-admin"]
export const access = ACCESS.private
