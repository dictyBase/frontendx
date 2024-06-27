import { useNavigate } from "react-router-dom"
import { Container, Grid, Box, Theme, Typography } from "@material-ui/core"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { useSlug } from "../../../common/hooks/useSlug"
import {
  NotFoundError,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { makeStyles } from "@material-ui/core/styles"
import { FunctionComponent } from "react"
import { ACCESS } from "@dictybase/auth"
import { Editor } from "@dictybase/editor"
import { useAuthorizedUpdateContent } from "../../../common/utils/useAuthorizedUpdateContent"

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
type UpdateNewsProperties = {
  contentId: string
  content: string
}

const UpdateNews = ({ contentId, content }: UpdateNewsProperties) => {
  const navigate = useNavigate()
  const authorizedUpdateContent = useAuthorizedUpdateContent(
   contentId,
  )

  const handleSave = async (contentValue: string) => {
    // handle error / success state
    await authorizedUpdateContent(contentValue)
    navigate("../editable", { relative: "path" })
  }

  const handleCancel = async () => {
    navigate("../editable", { relative: "path" })
  }

  return (
    <Container>
      <Editor
        content={{ storageKey: undefined, editorState: content }}
        editable
        toolbar={CreateNewsToolbar}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </Container>
  )
}
const NAMESPACE = "news"

const UpdatePage = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "none",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({id, content}) => <UpdateNews contentId={id} content={content} />,
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => (
        <NotFoundError />
      )),
    )
    .otherwise(() => <> This message should not appear. </>)
}
// eslint-disable-next-line import/no-default-export
export default UpdatePage
export const roles = ["content-admin"]
export const access = ACCESS.private
