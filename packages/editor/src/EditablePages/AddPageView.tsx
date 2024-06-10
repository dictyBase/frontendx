import { Container } from "@material-ui/core"
import { AddPageEditor } from "./AddPageEditor"

type AddPageViewProperties = {
  userId: string
  getAccessToken: (resource?: string) => Promise<string | undefined>
  namespace: string
  slug: string
  contentPath: string
}

/**
 * This is the view component so an authorized user can add a new page.
 */
const AddPageView = ({
  userId,
  getAccessToken,
  namespace,
  slug,
  contentPath,
}: AddPageViewProperties) => (
  <Container>
    <AddPageEditor
      userId={userId}
      getAccessToken={getAccessToken}
      contentPath={contentPath}
      slug={slug}
      namespace={namespace}
    />
  </Container>
)

export { AddPageView }
