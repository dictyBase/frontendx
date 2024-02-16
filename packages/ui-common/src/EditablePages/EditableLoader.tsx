import { Container } from "@material-ui/core"
import { LoadingDisplay } from "../LoadingDisplay"

const EditableLoader = () => (
  <Container>
    <LoadingDisplay rows={1} height={100} />
    <br />
    <LoadingDisplay rows={7} height={50} />
    <br />
    <LoadingDisplay rows={7} height={50} />
    <br />
    <LoadingDisplay rows={7} height={50} />
  </Container>
)

export { EditableLoader }
