import { FunctionComponent, useState, useRef, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import CircularProgress from "@mui/material/CircularProgress"
import TextField from "@mui/material/TextField"
import Fade from "@mui/material/Fade"
import Grow from "@mui/material/Grow"
import AddIcon from "@mui/icons-material/Add"
import CheckIcon from "@mui/icons-material/Check"

type MorphingButtonProperties = {
  onAdd: (value: string) => Promise<void> | void
}

const MorphingCreateButton: FunctionComponent<MorphingButtonProperties> = ({
  onAdd,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const inputReference = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded) {
      inputReference.current?.focus()
    }
  }, [isExpanded])

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
            backgroundColor: "primary.main",
            width: "100%",
            color: "primary.contrastText",
            borderRadius: "9999px",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            // position: "absolute",
            // right: 0,
            bgcolor: "primary.main",
            boxShadow: 2,
            // width: 36,
            // height: 36,
            transform: isExpanded ? "translateX(156px)" : "translateX(0)",
            transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
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
            placeholder="Add new name..."
            size="small"
            fullWidth
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
                  borderColor: "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  borderWidth: 2,
                },
              },
              "& input": {
                paddingLeft: 2,
              },
            }}
          />
          <IconButton
            onClick={handleAdd}
            disabled={loading}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              height: 36,
              width: 36,
              color: "primary.main",
              "&:hover": {
                color: "primary.dark",
              },
            }}
            aria-label="Save new tag">
            {loading ? (
              <CircularProgress size={20} sx={{ color: "primary.main" }} />
            ) : (
              <CheckIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Box>
      </Fade>
    </Box>
  )
}

export { MorphingCreateButton }
