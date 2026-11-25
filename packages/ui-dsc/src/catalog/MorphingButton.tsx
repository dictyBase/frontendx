import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { pipe } from "fp-ts/function"
import { trim } from "fp-ts/string"
import { match as Bmatch } from "fp-ts/boolean"
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
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import Grow from "@mui/material/Grow"
import AddIcon from "@mui/icons-material/Add"
import { UpdateStrainError } from "./useAuthorizedUpdateStrain"
import { MorphingButtonTextFieldBox } from "./MorphingButtonTextFieldBox"
import { MorphingTextField } from "./MorphingTextField"
import { LoadingConfirmationButton } from "./LoadingConfirmationButton"
import { StrainEditErrorAlert } from "./StrainEditErrorAlert"

const BUTTON_COLOR = "primary.main"

type MorphingButtonProperties = {
  /** Handler invoked when a new item is submitted */
  onAdd: (value: string) => TaskEither<UpdateStrainError, unknown>
}

/**
 * Circular add icon button that morphs into a text input and confirmation button.
 *
 * @param properties - Properties containing the `onAdd` TaskEither callback.
 * @returns The rendered MorphingButton component.
 */
const MorphingButton = ({ onAdd }: MorphingButtonProperties) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Option<UpdateStrainError>>(none)
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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>
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

  const containerWidth = pipe(
    isExpanded,
    Bmatch(
      () => 36,
      () => 192,
    ),
  )

  const buttonTransform = pipe(
    isExpanded,
    Bmatch(
      () => "translateX(0)",
      () => "translateX(156px)",
    ),
  )

  const buttonPointerEvents = pipe(
    isExpanded,
    Bmatch(
      () => "auto" as const,
      () => "none" as const,
    ),
  )

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          height: 36,
          width: containerWidth,
          transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
        <Grow in={!isExpanded} timeout={500}>
          <IconButton
            onClick={handleExpand}
            sx={{
              position: "absolute",
              right: 0,
              bgcolor: BUTTON_COLOR,
              color: "white",
              borderRadius: "50%",
              boxShadow: 2,
              width: 36,
              height: 36,
              transform: buttonTransform,
              transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                bgcolor: "primary.dark",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: BUTTON_COLOR,
                outlineOffset: 2,
              },
              pointerEvents: buttonPointerEvents,
            }}
            aria-label="Add new tag">
            <AddIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Grow>
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

export { MorphingButton, type MorphingButtonProperties }
