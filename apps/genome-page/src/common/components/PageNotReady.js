// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import { SaveButton, Jumbotron, RouterLink } from "styles/style"

/**
 * General 404 error page, currently designated as "Page Not Ready"/"Under Construction"
 */

const PageNotReady = () => {
  return (
    <Flex justify="center" style={{ marginTop: "20px" }}>
      <Box w="60%">
        <Jumbotron>
          <h1>
            <FontAwesome name="wrench" /> Under Construction
          </h1>
          <p>This page is not ready yet.</p>
          <Flex justify="center">
            <Box w={["90%", "60%", "25%"]}>
              <RouterLink to="/">
                <SaveButton size="small" variant="contained" color="primary">
                  Dictybase Home
                </SaveButton>
              </RouterLink>
            </Box>
          </Flex>
        </Jumbotron>
      </Box>
    </Flex>
  )
}

export default PageNotReady
