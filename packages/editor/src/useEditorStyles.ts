const getEditorAreaStyles = (editable: boolean) => ({
  position: "relative",
  "& #content-editor": {
    overflowY: editable ? "scroll" : "initial",
    maxHeight: editable ? "70vh" : "auto",
    minHeight: editable ? "150px" : "auto",
    resize: "none",
    fontSize: "15px",
    position: "relative",
    tabSize: "1",
    outline: "0",
    padding: "15px 10px",
    caretColor: "#444",
  },
})

const editorPlaceholderStyles = {
  color: "#999",
  overflow: "hidden",
  position: "absolute",
  textOverflow: "ellipsis",
  top: "30px",
  left: "10px",
  fontSize: "15px",
  userSelect: "none",
  display: "inline-block",
  pointerEvents: "none",
}

export { getEditorAreaStyles, editorPlaceholderStyles }
