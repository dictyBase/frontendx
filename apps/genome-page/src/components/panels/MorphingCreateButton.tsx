import { FunctionComponent, useState, useRef, useEffect } from "react"
import { pipe } from "fp-ts/function"
import { trim } from "fp-ts/string"
import {
  flatMap as TEflatMap,
  of as TEof,
  tapIO,
  match as TEmatch,
} from "fp-ts/TaskEither"
import { of as IOof } from "fp-ts/IO"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Fade from "@mui/material/Fade"
import Grow from "@mui/material/Grow"
import AddIcon from "@mui/icons-material/Add"
import { LoadingConfirmationButton } from "./LoadingConfirmationButton"

const buttonColor = "primary.main"

const MorphingCreateButton: FunctionComponent<{
  onAdd: (value: string) => Promise<void> | void
}> = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
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

  const handleAdd = async () => {
    if (!inputValue.trim()) return
    setLoading(true)
    await onAdd(inputValue.trim())

    setInputValue("")
    setIsExpanded(false)
    setLoading(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAdd()
    }
    if (event.key === "Escape" && !loading) {
      setInputValue("")
      setIsExpanded(false)
    }
  }

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleBlur = () => {
    if (!inputValue && !loading) {
      setIsExpanded(false)
    }
  }

  return (
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
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            pointerEvents: isExpanded ? "auto" : "none",
          }}>
          <TextField
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
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 36,
                borderRadius: 18,
                paddingRight: "40px",
                bgcolor: "background.paper",
                "& fieldset": {
                  borderColor: "primary.light",
                  borderWidth: 2,
                },
                "&:hover fieldset": {
                  borderColor: buttonColor,
                },
                "&.Mui-focused fieldset": {
                  borderColor: buttonColor,
                  borderWidth: 2,
                },
              },
              "& input": {
                paddingLeft: 2,
              },
            }}
          />
          <LoadingConfirmationButton onClick={handleAdd} loading={loading} />
        </Box>
      </Fade>
    </Box>
  )
}

export { MorphingCreateButton }
