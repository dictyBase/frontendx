import {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  useState,
} from "react"
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
  useAuthorizedUpdateGeneGeneralInfo,
  UpdateGeneGeneralInfoError,
} from "common/hooks/useAuthorizedUpdateGeneGeneralInfo"
import { SummaryPageErrorAlert } from "./SummaryPageErrorAlert"

const EditingInfoText: FunctionComponent<{
  id: string
  initialText: string
  setIsEditing: Dispatch<SetStateAction<boolean>>
}> = ({ id, initialText, setIsEditing }) => {
  const [text, setText] = useState(initialText)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Option<UpdateGeneGeneralInfoError>>(none)
  const update = useAuthorizedUpdateGeneGeneralInfo()

  const handleSave = () => {
    if (text === initialText) return
    pipe(
      text,
      trim,
      TEof,
      tapIO(() => IOof(setLoading(true))),
      TEflatMap(() =>
        update(id, {
          description: pipe(
            text,
            SisEmpty,
            Bmatch(
              () => text,
              // eslint-disable-next-line unicorn/no-null
              () => null,
            ),
          ),
        }),
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
            disabled={text === initialText}>
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
            <SummaryPageErrorAlert
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

export { EditingInfoText }
