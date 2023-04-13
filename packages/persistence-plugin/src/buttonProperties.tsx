import { ReactNode } from "react"
import SaveIcon from "@material-ui/icons/Save"
import DoneIcon from "@material-ui/icons/Done"
import ErrorIcon from "@material-ui/icons/Error"
import { CircularProgress, PropTypes } from "@material-ui/core"
import ButtonStates from "./ButtonStates"
import TextSlide from "./TextSlide"

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

export const buttonColor: Record<ButtonStates, PropTypes.Color> = {
  NORMAL: "primary",
  LOADING: "default",
  DONE: "primary",
  ERROR: "secondary",
}
