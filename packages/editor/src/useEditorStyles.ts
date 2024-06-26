import { makeStyles, Theme } from "@material-ui/core"

const useEditorAreaStyles = makeStyles<Theme, { editable: boolean }>({
  container: {
    overflowY: ({ editable }) => (editable ? "scroll" : "initial"),
    maxHeight: ({ editable }) => (editable ? "70vh" : "auto"),
    minHeight: ({ editable }) => (editable ? "150px" : "auto"),
    resize: "none",
    fontSize: "15px",
    position: "relative",
    tabSize: "1",
    outline: "0",
    padding: "15px 10px",
    caretColor: "#444",
  },
  root: {
    position: "relative",
  },
})

const useEditorPlaceholderStyles = makeStyles({
  root: {
    color: "#999",
    overflow: "hidden",
    position: "absolute",
    textOverflow: "ellipsis",
    top: "15px",
    left: "10px",
    fontSize: "15px",
    userSelect: "none",
    display: "inline-block",
    pointerEvents: "none",
  },
})

export { useEditorAreaStyles, useEditorPlaceholderStyles }
