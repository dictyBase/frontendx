import Container from "@material-ui/core/Container"
import { Editor } from "editor"

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

const InfoPageContainer = () => (
  <Container>
    <Editor
      content={{
        storageKey: "",
        editorState: JSON.stringify(temporaryContent),
      }}
      editable
    />
  </Container>
)

// eslint-disable-next-line import/no-default-export
export default InfoPageContainer
