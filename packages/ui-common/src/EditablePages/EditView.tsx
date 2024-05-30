import { Container } from "@material-ui/core"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { EditEditor } from "./EditEditor"

type EditViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
  userId: string
  getAccessToken: (resource?: string) => Promise<string | undefined>
}

const EditView = ({ data, userId, getAccessToken }: EditViewProperties) => (
  <Container>
    <EditEditor data={data} userId={userId} getAccessToken={getAccessToken} />
  </Container>
)

export { EditView }
