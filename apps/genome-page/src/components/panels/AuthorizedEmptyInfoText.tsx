import { useState, FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { CreatableInfoText } from "./CreatableInfoText"
import { CreatingInfoText } from "./CreatingInfoText"

const AuthorizedEmptyInfoText: FunctionComponent<{ id: string }> = ({ id }) => {
  const [isCreating, setIsCreating] = useState(false)

  return pipe(
    isCreating,
    Bmatch(
      () => <CreatableInfoText setIsCreating={setIsCreating} />,
      () => <CreatingInfoText setIsCreating={setIsCreating} id={id} />,
    ),
  )
}

export { AuthorizedEmptyInfoText }
