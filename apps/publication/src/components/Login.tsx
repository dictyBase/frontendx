import React from "react"
import { ApolloError } from "@apollo/client"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import {
  GoogleButton,
  LinkedInButton,
  OrcidButton,
} from "dicty-components-login"
import { oauthConfig } from "../common/utils/oauthConfig"
import { ErrorNotification } from "./errors/ErrorNotification"
import { useAuthStore } from "./auth/AuthStore"
import { OauthSignHandler } from "./auth/OauthSignHandler"

type Config = {
  name: string
  url: string
  authorizationEndpoint: string
  clientId: string
  redirectUrl: string
  requiredUrlParams?: Array<Array<string>>
  scopes: Array<string>
  scopeDelimiter: string
  optionalUrlParams?: Array<Array<string>>
}

const formatURLParameters = (parameters: Array<Array<string>>) => {
  let url = ""
  parameters.forEach((element) => {
    url += `&${element[0]}=${element[1]}`
  })
  return url
}

const createOauthURL = (config: Config) => {
  let url = `${config.authorizationEndpoint}?client_id=${config.clientId}`
  url += `&scope=${config.scopes.join(config.scopeDelimiter)}`
  if (config.requiredUrlParams) {
    url += formatURLParameters(config.requiredUrlParams)
  }
  if (config.optionalUrlParams) {
    url += formatURLParameters(config.optionalUrlParams)
  }
  url += `&redirect_uri=${config.redirectUrl}`
  return url
}

const openOauthWindow = (name: string) => {
  const config = oauthConfig[name]
  const url = createOauthURL(config)
  window.open(
    url,
    name,
    `width=${config.popupOptions.width},
                    height=${config.popupOptions.height}`,
  )
}

const generateErrorDisplayMessage = (error: ApolloError) => {
  let message = "Could not log in. Please contact us if the problem persists."
  if (error.networkError) {
    message = "Network Error"
  }
  if (
    error.graphQLErrors &&
    error.graphQLErrors.length > 0 &&
    error.graphQLErrors[0].extensions &&
    error.graphQLErrors[0].extensions.code === "NotFound"
  ) {
    message = `Could not find user account. 
      
      Please make sure you are a verified user and try again.`
  }
  return message
}

/**
 * Component that displays all of the social login buttons with click handlers for each one
 */

const Login = () => {
  const {
    state: { error },
  } = useAuthStore()
  let message = ""

  if (error) {
    message = generateErrorDisplayMessage(error)
  }

  return (
    <Container maxWidth="xs">
      <Box mt={2} mb={3}>
        <Typography variant="h1" align="center">
          Log in
        </Typography>
      </Box>
      <Box textAlign="center">
        {error && <ErrorNotification error={message} />}
        <Box mb={2} fontWeight={900}>
          <OrcidButton
            handleClick={() => openOauthWindow("orcid")}
            text="Sign in with ORCID"
          />
        </Box>
        <Box mb={2}>
          <GoogleButton
            handleClick={() => openOauthWindow("google")}
            text="Sign in with Google"
          />
        </Box>
        <Box mb={6}>
          <LinkedInButton
            handleClick={() => openOauthWindow("linkedin")}
            text="Sign in with LinkedIn"
          />
        </Box>
        <OauthSignHandler />
      </Box>
    </Container>
  )
}

export { Login, createOauthURL, generateErrorDisplayMessage } // for testing purposes
