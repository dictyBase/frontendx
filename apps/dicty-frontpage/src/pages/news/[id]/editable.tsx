import { useNavigate } from "react-router-dom"
import { Container, Typography, Button } from "@material-ui/core"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import {
  NotFoundError,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
  ActionBar,
} from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import { ACCESS } from "@dictybase/auth"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { useSlug } from "../../../common/hooks/useSlug"
import { DeleteButton } from "../../../common/components/DeleteButton"

type EditableViewProperties = {
  content: string
  id: string
}
const EditableView = ({ content, id }: EditableViewProperties) => {
  const navigate = useNavigate()
  const handleEdit = async () => {
    navigate("../edit", { relative: "path" })
  }
  const handleReturn = () => {
    navigate("/news/editable")
  }

  const toolbar = (
    <ActionBar descriptionElement={<Typography>Edit News</Typography>}>
      <Button color="primary" variant="contained" onClick={handleEdit}>
        Edit
      </Button>
      <DeleteButton id={id} />
      <Button variant="contained" onClick={handleReturn}>
        All News{" "}
      </Button>
    </ActionBar>
  )
  return (
    <Container>
      <Editor
        content={{ storageKey: undefined, editorState: content }}
        toolbar={toolbar}
      />
    </Container>
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
      ({ id, content }) => <EditableView id={id} content={content} />,
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
