import React from "react"
import Box from "@material-ui/core/Box"
import { CircularProgress, Typography } from "@material-ui/core"

/**
 * Loading screen during the login process
 */
const AuthLoader = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography variant="h1" align="center">
        Logging in...
      </Typography>
      <Box textAlign="center" mt={3}>
        <CircularProgress />
      </Box>
    </Box>
  )
}

export default AuthLoader
