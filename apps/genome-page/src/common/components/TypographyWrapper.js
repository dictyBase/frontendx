import React from "react"
import Typography from "@material-ui/core/Typography"

/**
 * This is a basic typography wrapper for consistent Material-UI styling.
 */

const TypographyWrapper = ({ children }) => (
  <Typography component="div">{children}</Typography>
)

export default TypographyWrapper
