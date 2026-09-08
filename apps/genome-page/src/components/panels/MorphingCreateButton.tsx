import { FunctionComponent, useState, useRef, useEffect } from "react"
import { pipe } from "fp-ts/function"
import { trim } from "fp-ts/string"
import {
  TaskEither,
  flatMap as TEflatMap,
  of as TEof,
  tapIO,
  match as TEmatch,
} from "fp-ts/TaskEither"
import { of as IOof } from "fp-ts/IO"
import { Option, none, some, isSome, match as Omatch } from "fp-ts/Option"
import { match } from "ts-pattern"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Fade from "@mui/material/Fade"
import Grow from "@mui/material/Grow"
import AddIcon from "@mui/icons-material/Add"
import { CreateGeneGeneralInfoError } from "common/hooks/useAuthorizedCreateGeneGeneralInfo"
import { LoadingConfirmationButton } from "./LoadingConfirmationButton"
import { MorphingButtonTextFieldBox } from "./MorphingButtonTextFieldBox"
import { MorphingTextField } from "./MorphingTextField"
import { SummaryPageErrorAlert } from "./SummaryPageErrorAlert"

const buttonColor = "primary.main"

const MorphingCreateButton: FunctionComponent<{
  onAdd: (value: string) => TaskEither<CreateGeneGeneralInfoError, any>
}> = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Option<CreateGeneGeneralInfoError>>(none)
  const inputReference = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded) {
      inputReference.current?.focus()
    }
  }, [isExpanded])

  const handleAdd = pipe(
    inputValue,
    trim,
    TEof,
    tapIO(() => IOof(setLoading(true))),
    TEflatMap(onAdd),
    TEmatch(
      (errorValue) => {
        setError(some(errorValue))
        setLoading(false)
      },
      () => {
        setInputValue("")
        setIsExpanded(false)
        setLoading(false)
      },
    ),
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
    match({ key: event.key, loading })
      .with({ key: "Enter" }, () => {
        handleAdd()
      })
      .with({ key: "Escape", loading: false }, () => {
        setInputValue("")
        setIsExpanded(false)
      })
      .otherwise(() => {
        setError(none)
      })

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleBlur = () => {
    if (!inputValue && !loading) {
      setIsExpanded(false)
    }
  }

  const handleCloseSnackbar = () => {
    setError(none)
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          height: 36,
          width: isExpanded ? 200 : 100,
          transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
        {/* Collapsed State: Plus Button */}
        <Grow in={!isExpanded} timeout={500}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleExpand}
            sx={{
              backgroundColor: buttonColor,
              width: "100%",
              color: "primary.contrastText",
              borderRadius: "9999px",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              bgcolor: buttonColor,
              boxShadow: 2,
              transform: isExpanded ? "translateX(156px)" : "translateX(0)",
              transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                bgcolor: "primary.dark",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: buttonColor,
                outlineOffset: 2,
              },
              pointerEvents: isExpanded ? "none" : "auto",
            }}>
            Create
          </Button>
        </Grow>
        {/* Expanded State: Input and Save Button */}
        <Fade in={isExpanded} timeout={100}>
          <MorphingButtonTextFieldBox isExpanded={isExpanded}>
            <MorphingTextField
              inputRef={inputReference}
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Add new item"
              fullWidth
              error={isSome(error)}
              disabled={loading}
            />
            <LoadingConfirmationButton onClick={handleAdd} loading={loading} />
          </MorphingButtonTextFieldBox>
        </Fade>
      </Box>
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

export { MorphingCreateButton }
