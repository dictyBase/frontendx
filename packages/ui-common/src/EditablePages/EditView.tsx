import { Container } from "@material-ui/core"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { EditEditor } from "./EditEditor"

type EditViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
  userId: string
  token: string
}

const EditView = ({ data, userId, token }: EditViewProperties) => (
  <Container>
    <EditEditor data={data} userId={userId} token={token} />
  </Container>
)

export { EditView }
