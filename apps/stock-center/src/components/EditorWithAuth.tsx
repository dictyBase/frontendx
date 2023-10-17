import Container from "@material-ui/core/Container"
import { tryCatch as TEtryCtach } from "fp-ts/TaskEither"
import { useLogto } from "@logto/react"
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

const EditorWithAuth = () => {
  const { isAuthenticated, fetchUserInfo } = useLogto()
  const
  // const editable === isAuthenticated &&
  return (
    <Container>
      <Editor
        content={{
          storageKey: "",
          editorState: JSON.stringify(temporaryContent),
        }}
        editable={false}
      />
    </Container>
  )
}

export { EditorWithAuth }
