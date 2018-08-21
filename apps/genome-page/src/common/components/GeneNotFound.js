// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import { Jumbotron } from "styles/style"

type Props = {
  /** The ID of the gene that cannot be found */
  gene: string,
}

/**
 * Gene not found error page
 */

const GeneNotFound = (props: Props) => {
  const { gene } = props
  return (
    <Flex justify="center" style={{ marginTop: "20px" }}>
      <Box w="60%">
        <Jumbotron>
          <h3>
            <FontAwesome name="info" /> Gene not found
          </h3>
          <p>{gene} is not in the database</p>
          <Flex justify="center">
            <Box w={["90%", "60%", "25%"]}>
              <ul>
                <li>
                  This is probably an invalid ID. Try with a different one.
                </li>
                <li>You are probably coming here from an outdated link.</li>
                <li>
                  If problems persist, email us at dictybase@northwestern.edu
                </li>
              </ul>
            </Box>
          </Flex>
        </Jumbotron>
      </Box>
    </Flex>
  )
}

export default GeneNotFound
