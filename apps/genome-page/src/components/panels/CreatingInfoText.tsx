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
  useAuthorizedCreateGeneGeneralInfo,
  CreateGeneGeneralInfoError,
} from "common/hooks/useAuthorizedCreateGeneGeneralInfo"
import { SummaryPageErrorAlert } from "./SummaryPageErrorAlert"

const CreatingInfoText: FunctionComponent<{
  id: string
  setIsCreating: Dispatch<SetStateAction<boolean>>
}> = ({ id, setIsCreating }) => {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Option<CreateGeneGeneralInfoError>>(none)
  const create = useAuthorizedCreateGeneGeneralInfo()

  const handleSave = () => {
    if (SisEmpty(text)) return
    pipe(
      text,
      trim,
      TEof,
      tapIO(() => IOof(setLoading(true))),
      TEflatMap(() => create(id, { description: text })),
      TEmatch(
        (errorValue) => {
          setError(some(errorValue))
          setLoading(false)
          setIsCreating(false)
        },
        () => {
          setText("")
          setLoading(false)
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
        <Stack direction="row" spacing={1} justifyContent="flex-end">
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
            disabled={SisEmpty(text)}>
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

export { CreatingInfoText }
