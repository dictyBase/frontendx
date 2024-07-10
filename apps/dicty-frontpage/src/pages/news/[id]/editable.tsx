import { useNavigate } from "react-router-dom"
import { Container, Typography, Button } from "@material-ui/core"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { some } from "fp-ts/Option"
import { Provider, createStore } from "jotai"
import {
  NotFoundError,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
  ActionBar,
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
  updated_at: string
}
const EditableView = ({ content, id, updated_at }: EditableViewProperties) => {
  const navigate = useNavigate()
  const handleEdit = async () => {
    navigate("../edit", { relative: "path" })
  }
  const handleReturn = () => {
    navigate("/news/editable")
  }

  const contentStore = createStore()
  contentStore.set(contentIdAtom, some(id))

  const toolbar = (
    <ActionBar descriptionElement={<Typography>Edit News</Typography>}>
      <Button color="primary" variant="contained" onClick={handleEdit}>
        Edit
      </Button>
      <DeleteDialogButton />
      <Button variant="contained" onClick={handleReturn}>
        All News
      </Button>
    </ActionBar>
  )
  return (
    <Provider store={contentStore}>
      <Container>
        <Typography variant="h2">
          {pipe(updated_at, parseISO, format("PPPP"))}
        </Typography>
        <Editor
          content={{ storageKey: undefined, editorState: content }}
          toolbar={toolbar}
        />
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
      ({ id, content, updated_at }) => <EditableView id={id} content={content} updated_at={updated_at} />,
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
