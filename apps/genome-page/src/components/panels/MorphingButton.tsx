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
import { match } from "ts-pattern"
import IconButton from "@mui/material/IconButton"
import Fade from "@mui/material/Fade"
import Grow from "@mui/material/Grow"
import AddIcon from "@mui/icons-material/Add"
import { UpdateGeneGeneralInfoError } from "common/hooks/useAuthorizedUpdateGeneGeneralInfo"
import { MorphingButtonBox } from "./MorphingButtonBox"
import { MorphingTextField } from "./MorphingTextField"
import { LoadingConfirmationButton } from "./LoadingConfirmationButton"

const buttonColor = "primary.main"

const MorphingButton: FunctionComponent<{
  onAdd: (value: string) => TaskEither<UpdateGeneGeneralInfoError, any>
}> = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const timerReference = useRef<NodeJS.Timeout | null>(null)
  const inputReference = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded) {
      inputReference.current?.focus()
    }
  }, [isExpanded])

  useEffect(() => {
    if (error) {
      timerReference.current = setTimeout(() => {
        setError(false)
      }, 1000)
    }
    return () => {
      if (timerReference.current) clearTimeout(timerReference.current)
    }
  }, [error])

  const handleAdd = pipe(
    inputValue,
    trim,
    TEof,
    tapIO(() => IOof(setLoading(true))),
    TEflatMap(onAdd),
    TEmatch(
      () => {
        setError(true)
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
        setError(false)
      })
      .otherwise(() => {
        setError(false)
      })

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleBlur = () => {
    if (!inputValue && !loading) {
      setIsExpanded(false)
    }
  }

  return (
    <MorphingButtonBox
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        height: 36,
        width: isExpanded ? 192 : 36,
        transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
      {/* Collapsed State: Plus Button */}
      <Grow in={!isExpanded} timeout={500}>
        <IconButton
          onClick={handleExpand}
          sx={{
            position: "absolute",
            right: 0,
            bgcolor: buttonColor,
            color: "white",
            borderRadius: "50%",
            boxShadow: 2,
            width: 36,
            height: 36,
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
          }}
          aria-label="Add new tag">
          <AddIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Grow>

      {/* Expanded State: Input and Save Button */}
      <Fade in={isExpanded} timeout={100}>
        <MorphingButtonBox isExpanded={isExpanded}>
          <MorphingTextField
            inputRef={inputReference}
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Add new item"
            size="small"
            fullWidth
            error={error}
            hasError={error}
            disabled={loading}
          />
          <LoadingConfirmationButton onClick={handleAdd} loading={loading} />
        </MorphingButtonBox>
      </Fade>
    </MorphingButtonBox>
  )
}

export { MorphingButton }
