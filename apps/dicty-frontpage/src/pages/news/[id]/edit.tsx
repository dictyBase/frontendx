import { useNavigate } from "react-router-dom"
import { Grid, Container, Typography, Button } from "@material-ui/core"
import { useContentBySlugQuery, User } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { parseISO, format } from "date-fns/fp"
import {
  NotFoundError,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
  ActionBar,
  CopyLinkButton,
  BrowseNewsButton,
} from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth"
import { Editor } from "@dictybase/editor"
import { useSlug } from "../../../common/hooks/useSlug"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { UpdateButton } from "../../../common/components/UpdateButton"

type EditViewProperties = {
  content: string
  contentId: string
  createdAt: string
  updatedBy: Pick<User, "first_name" | "last_name">
}

const EditView = ({
  contentId,
  content,
  createdAt,
  updatedBy,
}: EditViewProperties) => {
  const navigate = useNavigate()
  const handleCancel = async () => {
    navigate("../editable", { relative: "path" })
  }
  const lastEditor = `${updatedBy.first_name} ${updatedBy.last_name}`
  const toolbar = (
    <ActionBar
      descriptionElement={
        <Typography>Last updated by {lastEditor}</Typography>
      }>
      <UpdateButton contentId={contentId} />
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    </ActionBar>
  )
  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid spacing={1} container alignItems="baseline">
            <Grid item>
              <Typography variant="h2">
                {pipe(createdAt, parseISO, format("PPPP"))}
              </Typography>
            </Grid>
            <Grid item>
              <CopyLinkButton />
            </Grid>
            <Grid item>
              <BrowseNewsButton />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Editor
            content={{ storageKey: undefined, editorState: content }}
            editable
            toolbar={toolbar}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

const Edit = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NEWS_NAMESPACE}-${slug}` },
    errorPolicy: "none",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ id, content, created_at, updated_by }) => (
        <EditView
          contentId={id}
          content={content}
          createdAt={created_at}
          updatedBy={updated_by}
        />
      ),
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => <NotFoundError />),
    )
    .otherwise(() => <> This message should not appear. </>)
}
// eslint-disable-next-line import/no-default-export
export default Edit
export { EditView }
export const roles = ["content-admin"]
export const access = ACCESS.private
