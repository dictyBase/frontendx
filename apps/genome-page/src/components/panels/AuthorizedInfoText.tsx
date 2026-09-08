import { useState, FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { EditableInfoText } from "./EditableInfoText"
import { EditingInfoText } from "./EditingInfoText"

const AuthorizedInfoText: FunctionComponent<{ id: string; text: string }> = ({
  id,
  text,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  return pipe(
    isEditing,
    Bmatch(
      () => <EditableInfoText setIsEditing={setIsEditing} text={text} />,
      () => (
        <EditingInfoText
          setIsEditing={setIsEditing}
          id={id}
          initialText={text}
        />
      ),
    ),
  )
}

export { AuthorizedInfoText }
