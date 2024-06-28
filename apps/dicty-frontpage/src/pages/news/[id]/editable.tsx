import { useNavigate } from "react-router-dom"
import { Container, Typography, Button } from "@material-ui/core"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import {
  NotFoundError,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import { ACCESS } from "@dictybase/auth"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { useSlug } from "../../../common/hooks/useSlug"
import { ActionBar } from "../../../common/components/ActionBar"

type EditableViewProperties = {
  content: string
}
const EditableView = ({ content }: EditableViewProperties) => {
  const navigate = useNavigate()
  const handleEdit = async () => {
    navigate("../edit", { relative: "path" })
  }

  const toolbar = (
    <ActionBar descriptionElement={<Typography>Write News</Typography>}>
      <Button onClick={handleEdit}> Edit </Button>
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
      { data: { contentBySlug: { content: P.select(P.string) } } },
      (content) => <EditableView content={content} />,
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
export default Editable
export const roles = ["content-admin"]
export const access = ACCESS.private