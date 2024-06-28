import { useNavigate } from "react-router-dom"
import { Container, Typography, Button } from "@material-ui/core"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import {
  NotFoundError,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth"
import { Editor } from "@dictybase/editor"
import { useSlug } from "../../../common/hooks/useSlug"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { UpdateButton } from "../../../common/components/UpdateButton"
import { ActionBar } from "../../../common/components/ActionBar"

type EditViewProperties = {
  contentId: string
  content: string
}

const EditView = ({ contentId, content }: EditViewProperties) => {
  const navigate = useNavigate()
  const handleCancel = async () => {
    navigate("../editable", { relative: "path" })
  }

  const toolbar = (
    <ActionBar descriptionElement={<Typography>Write News</Typography>}>
      <UpdateButton contentId={contentId} />
      <Button onClick={handleCancel}> Cancel </Button>
    </ActionBar>
  )
  return (
    <Container>
      <Editor
        content={{ storageKey: undefined, editorState: content }}
        editable
        toolbar={toolbar}
      />
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
      ({ id, content }) => <EditView contentId={id} content={content} />,
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => <NotFoundError />),
    )
    .otherwise(() => <> This message should not appear. </>)
}
// eslint-disable-next-line import/no-default-export
export default Edit
export const roles = ["content-admin"]
export const access = ACCESS.private
