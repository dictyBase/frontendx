import { ReactNode } from "react"
import SaveIcon from "@mui/icons-material/Save"
import DoneIcon from "@mui/icons-material/Done"
import ErrorIcon from "@mui/icons-material/Error"
import { CircularProgress } from "@mui/material"
import { ButtonStates } from "./ButtonStates"
import { TextSlide } from "./TextSlide"

export const buttonText: Record<ButtonStates, ReactNode> = {
  NORMAL: <TextSlide text="Save" />,
  LOADING: <TextSlide text="Loading" />,
  DONE: <TextSlide text="Done!" />,
  ERROR: <TextSlide text="Error" />,
}

export const buttonIcon: Record<ButtonStates, ReactNode> = {
  NORMAL: <SaveIcon />,
  LOADING: <CircularProgress size={22} />,
  DONE: <DoneIcon />,
  ERROR: <ErrorIcon />,
}

export const buttonColor: Record<
  ButtonStates,
  "primary" | "inherit" | "secondary"
> = {
  NORMAL: "primary",
  LOADING: "inherit",
  DONE: "primary",
  ERROR: "secondary",
}
