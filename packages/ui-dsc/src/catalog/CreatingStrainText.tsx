import { Dispatch, SetStateAction, ChangeEventHandler, useState } from "react"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty, trim } from "fp-ts/string"
import { match as Bmatch } from "fp-ts/boolean"
import {
  flatMap as TEflatMap,
  of as TEof,
  tapIO,
  match as TEmatch,
} from "fp-ts/TaskEither"
import { of as IOof } from "fp-ts/IO"
import { Option, none, some, match as Omatch } from "fp-ts/Option"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import {
  useAuthorizedUpdateStrain,
  UpdateStrainError,
} from "./useAuthorizedUpdateStrain"
import {
  buildStrainTextUpdateInput,
  StrainTextEditableField,
} from "./EditingStrainText"
import { StrainEditErrorAlert } from "./StrainEditErrorAlert"

type CreatingStrainTextProperties = {
  /** Strain ID */
  id: string
  /** Strain field key to populate */
  field: StrainTextEditableField
  /** State setter to exit creating mode */
  setIsCreating: Dispatch<SetStateAction<boolean>>
}

/**
 * Inline text editor for populating an empty single-value strain field.
 *
 * @param properties - Strain ID, field key, and creating state setter.
 * @returns The rendered CreatingStrainText component.
 */
const CreatingStrainText = ({
  id,
  field,
  setIsCreating,
}: CreatingStrainTextProperties) => {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Option<UpdateStrainError>>(none)
  const update = useAuthorizedUpdateStrain()

  const trimmedText = pipe(text, trim)

  const handleSave = () => {
    if (SisEmpty(trimmedText)) return
    pipe(
      trimmedText,
      TEof,
      tapIO(() => IOof(setLoading(true))),
      TEflatMap((value) =>
        update(id, buildStrainTextUpdateInput(field, value)),
      ),
      TEmatch(
        (errorValue) => {
          setError(some(errorValue))
          setLoading(false)
        },
        () => {
          setText("")
          setLoading(false)
          setIsCreating(false)
        },
      ),
    )()
  }

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    currentTarget: { value },
  }) => {
    setText(value)
  }

  const handleCancel = () => {
    setIsCreating(false)
  }

  const handleCloseSnackbar = () => {
    setError(none)
  }

  return (
    <>
      <Stack direction="column" spacing={1}>
        <TextField
          autoFocus
          multiline
          fullWidth
          maxRows={4}
          variant="outlined"
          value={text}
          onChange={handleChange}
          InputProps={{ sx: { fontSize: ".8165rem" } }}
        />
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          alignItems="center">
          {pipe(
            loading,
            Bmatch(
              () => <></>,
              () => (
                <CircularProgress size={20} sx={{ color: "primary.main" }} />
              ),
            ),
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={SisEmpty(trimmedText) || loading}>
            Save
          </Button>
          <Button variant="contained" color="inherit" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
      {pipe(
        error,
        Omatch(
          () => <></>,
          ({ message }) => (
            <StrainEditErrorAlert
              open
              message={message}
              handleClose={handleCloseSnackbar}
            />
          ),
        ),
      )}
    </>
  )
}

export { CreatingStrainText, type CreatingStrainTextProperties }
