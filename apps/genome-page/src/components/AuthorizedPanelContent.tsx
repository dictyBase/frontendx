import { useState, FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { EditableContent } from "./EditableContent"
import { EditingContent } from "./EditingContent"

const AuthorizedPanelContent: FunctionComponent<{ content: string }> = ({
  content,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  return pipe(
    isEditing,
    Bmatch(
      () => <EditableContent setIsEditing={setIsEditing} content={content} />,
      () => <EditingContent setIsEditing={setIsEditing} content={content} />,
    ),
  )
}

export { AuthorizedPanelContent }
