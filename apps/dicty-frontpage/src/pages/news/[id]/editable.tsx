import { useNavigate } from "react-router-dom"
import { Grid, Container, Typography, Button } from "@material-ui/core"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { some } from "fp-ts/Option"
import { Provider, createStore } from "jotai"
import {
  NotFoundError,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
  ActionBar,
  CopyLinkButton,
  BrowseEditableNewsButton,
} from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import { ACCESS } from "@dictybase/auth"
import { pipe } from "fp-ts/function"
import { parseISO, format } from "date-fns/fp"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { useSlug } from "../../../common/hooks/useSlug"
import { DeleteDialogButton } from "../../../common/components/DeleteDialogButton"
import { contentIdAtom } from "../../../state"

type EditableViewProperties = {
  content: string
  id: string
  createdAt: string
}
const EditableView = ({ content, id, createdAt }: EditableViewProperties) => {
  const navigate = useNavigate()
  const handleEdit = async () => {
    navigate("../edit", { relative: "path" })
  }
  // This state makes the news id available to the news DeleteButton
  const contentStore = createStore()
  contentStore.set(contentIdAtom, some(id))

  const toolbar = (
    <ActionBar descriptionElement={<Typography>Edit News</Typography>}>
      <Button color="primary" variant="contained" onClick={handleEdit}>
        Edit
      </Button>
      <DeleteDialogButton />
    </ActionBar>
  )
  return (
    <Provider store={contentStore}>
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
                <BrowseEditableNewsButton />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Editor
              content={{ storageKey: undefined, editorState: content }}
              toolbar={toolbar}
            />
          </Grid>
        </Grid>
      </Container>
    </Provider>
  )
}

const Editable = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NEWS_NAMESPACE}-${slug}` },
    errorPolicy: "none",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ id, content, created_at }) => (
        <EditableView id={id} content={content} createdAt={created_at} />
      ),
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => <NotFoundError />),
    )
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default Editable
export { EditableView }
export const roles = ["content-admin"]
export const access = ACCESS.private
