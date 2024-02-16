import { Container } from "@material-ui/core"
import { LoadingDisplay } from "../LoadingDisplay"

/**
 * Loading component intended for use in editable content pages.
 */
const EditableContentLoadingDisplay = () => (
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

export { EditableContentLoadingDisplay }
