import { Container } from "@material-ui/core"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { EditableEditor } from "./EditableEditor"

type EditableViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditableView = ({ data }: EditableViewProperties) => (
  <Container>
    <EditableEditor data={data} />
  </Container>
)

export { EditableView }
