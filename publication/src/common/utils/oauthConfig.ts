import clientConfig from "../../common/utils/clientConfig"

// helper function to set redirect URL with basename if included
const redirectUrlGenerator = (provider: string) => {
  let url
  const basename = process.env.REACT_APP_BASENAME || "/"
  if (basename === "" || basename === "/") {
    url = `${window.location.origin}/${provider}/callback`
  } else if (basename.charAt(0) === "/") {
    url = `${window.location.origin}${basename}/${provider}/callback`
  } else {
    url = `${window.location.origin}/${basename}/${provider}/callback`
  }
  return url
}

interface Auth {
  google: {
    name: string
    url: string
    authorizationEndpoint: string
    clientId: string
    redirectUrl: string
    requiredUrlParams: Array<Array<string>>
    scopes: Array<string>
    scopeDelimiter: string
    optionalUrlParams: Array<Array<string>>
    popupOptions: {
      width: number
      height: number
    }
  }
  linkedin: {
    name: string
    url: string
    authorizationEndpoint: string
    clientId: string
    redirectUrl: string
    requiredUrlParams: Array<Array<string>>
    scopes: Array<string>
    scopeDelimiter: string
    popupOptions: {
      width: number
      height: number
    }
  }
  orcid: {
    name: string
    url: string
    authorizationEndpoint: string
    clientId: string
    redirectUrl: string
    requiredUrlParams: Array<Array<string>>
    scopes: Array<string>
    scopeDelimiter: string
    popupOptions: {
      width: number
      height: number
    }
  }
}

const oauthConfig: Auth = {
  google: {
    name: "Google",
    url: "/auth/google",
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    clientId: clientConfig.google.clientId,
    redirectUrl: redirectUrlGenerator("google"),
    requiredUrlParams: [["response_type", "code"]],
    scopes: ["email"],
    scopeDelimiter: " ",
    optionalUrlParams: [["state", "google"]],
    popupOptions: { width: 1020, height: 633 },
  },
  linkedin: {
    name: "LinkedIn",
    url: "/auth/linkedin",
    authorizationEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
    clientId: clientConfig.linkedin.clientId,
    redirectUrl: redirectUrlGenerator("linkedin"),
    scopes: ["r_emailaddress"],
    scopeDelimiter: " ",
    requiredUrlParams: [
      ["state", "linkedin"],
      ["response_type", "code"],
    ],
    popupOptions: { width: 1028, height: 640 },
  },
  orcid: {
    name: "ORCID",
    url: "/auth/orcid",
    authorizationEndpoint: "https://orcid.org/oauth/authorize",
    clientId: clientConfig.orcid.clientId,
    redirectUrl: redirectUrlGenerator("orcid"),
    scopes: ["/authenticate"],
    scopeDelimiter: " ",
    requiredUrlParams: [["response_type", "code"]],
    popupOptions: { width: 1028, height: 640 },
  },
}

export { redirectUrlGenerator }
export default oauthConfig
