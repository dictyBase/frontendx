import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import { Link as RouterLink } from "react-router-dom"
import { Editor } from "editor"
import { ACCESS } from "auth"

const temporaryContent = {
  root: {
    children: [
      {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 2,
                mode: "normal",
                style: "font-size: 20px;",
                text: "Content coming soon!",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "flex-layout",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}

type EditableProperties = { href: string }

const Editable = ({ href }: EditableProperties) => (
  <Container>
    <Button component={RouterLink} to={href}>Edit</Button>
    <Editor
      content={{
        storageKey: "",
        editorState: JSON.stringify(temporaryContent),
      }}
      editable={false}
    />
  </Container>
)

// eslint-disable-next-line import/no-default-export
export default Editable
export const access = ACCESS.private
export const roles = ["user-user", "content-admin"]
