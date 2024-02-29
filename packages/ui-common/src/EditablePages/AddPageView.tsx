import { Container } from "@material-ui/core"
import { AddPageEditor } from "./AddPageEditor"

type AddPageViewProperties = {
  userId: string
  token: string
  namespace: string
  slug: string
  contentPath: string
}

/**
 * This is the view component so an authorized user can add a new page.
 */
const AddPageView = ({
  userId,
  token,
  namespace,
  slug,
  contentPath,
}: AddPageViewProperties) => (
  <Container>
    <AddPageEditor
      userId={userId}
      token={token}
      contentPath={contentPath}
      slug={slug}
      namespace={namespace}
    />
  </Container>
)

export { AddPageView }
