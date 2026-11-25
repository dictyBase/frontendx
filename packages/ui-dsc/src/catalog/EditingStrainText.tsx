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
import { match } from "ts-pattern"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import { UpdateStrainInput } from "dicty-graphql-schema"
import {
  useAuthorizedUpdateStrain,
  UpdateStrainError,
} from "./useAuthorizedUpdateStrain"
import { StrainEditErrorAlert } from "./StrainEditErrorAlert"

type StrainTextEditableField =
  | "label"
  | "summary"
  | "systematic_name"
  | "genetic_modification"
  | "mutagenesis_method"
  | "parent"
  | "plasmid"
  | "genotypes"
  | "species"
  | "depositor"

/**
 * Builds the `UpdateStrainInput` payload for a single-value strain field.
 *
 * @param field - The strain field being updated.
 * @param value - The trimmed string value.
 * @returns The partial `UpdateStrainInput` object (excluding `updated_by`).
 */
const buildStrainTextUpdateInput = (
  field: StrainTextEditableField,
  value: string,
): Omit<UpdateStrainInput, "updated_by"> =>
  match(field)
    .with("genotypes", () =>
      pipe(
        value,
        SisEmpty,
        Bmatch(
          () => ({ genotypes: [value] }),
          () => ({ genotypes: [] }),
        ),
      ),
    )
    .otherwise((scalarField) => ({ [scalarField]: value }))

type EditingStrainTextProperties = {
  /** Strain ID */
  id: string
  /** Strain field key to update */
  field: StrainTextEditableField
  /** Initial text value loaded into the input */
  initialText: string
  /** State setter to exit editing mode */
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

/**
 * Inline text editor for a single-value strain field with Save, Cancel, loading, and error states.
 *
 * @param properties - Strain ID, field key, initial text, and edit state setter.
 * @returns The rendered EditingStrainText component.
 */
const EditingStrainText = ({
  id,
  field,
  initialText,
  setIsEditing,
}: EditingStrainTextProperties) => {
  const [text, setText] = useState(initialText)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Option<UpdateStrainError>>(none)
  const update = useAuthorizedUpdateStrain()

  const handleSave = () => {
    if (text === initialText) return
    pipe(
      text,
      trim,
      TEof,
      tapIO(() => IOof(setLoading(true))),
      TEflatMap((trimmedText) =>
        update(id, buildStrainTextUpdateInput(field, trimmedText)),
      ),
      TEmatch(
        (errorValue) => {
          setError(some(errorValue))
          setLoading(false)
        },
        () => {
          setLoading(false)
          setIsEditing(false)
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
    setIsEditing(false)
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
            disabled={text === initialText || loading}>
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

export {
  EditingStrainText,
  buildStrainTextUpdateInput,
  type EditingStrainTextProperties,
  type StrainTextEditableField,
}
