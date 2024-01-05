import Grid from "@material-ui/core/Grid"
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
  <Grid
    container
    item
    xs={12}
    spacing={3}
    alignItems="flex-end"
    style={{ marginTop: "20px" }}
    direction="column">
    <Button
      color="primary"
      variant="contained"
      component={RouterLink}
      style={{ width: "15%" }}
      to={href}>
      Edit Content
    </Button>
    <Editor
      content={{
        storageKey: "",
        editorState: JSON.stringify(temporaryContent),
      }}
      editable={false}
    />
  </Grid>
)

// eslint-disable-next-line import/no-default-export
export default Editable
export const access = ACCESS.private
export const roles = ["user-user", "content-admin"]
