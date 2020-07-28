let fetchUserByIdResource: string,
  fetchUserByEmailResource: string,
  fetchRoleByIdResource: string,
  fetchPermissionByIdResource: string,
  oauthEndpointResource: string

declare var process: {
  env: {
    REACT_APP_API_SERVER: string
    REACT_APP_AUTH_SERVER: string
  }
}

const apiServer: string = process.env.REACT_APP_API_SERVER
const authServer: string = process.env.REACT_APP_AUTH_SERVER

if (apiServer) {
  // set URL base for fetching user by ID
  const fetchUserByIdBase = "/users"
  fetchUserByIdResource = `${apiServer}${fetchUserByIdBase}`
  // set URL base for fetching user by email
  const fetchUserByEmailBase = "/users/email"
  fetchUserByEmailResource = `${apiServer}${fetchUserByEmailBase}`
  // set URL base for fetching role by ID
  const fetchRoleByIdBase = "/roles"
  fetchRoleByIdResource = `${apiServer}${fetchRoleByIdBase}`
  // set URL base for fetching permission by ID
  const fetchPermissionByIdBase = "/permissions"
  fetchPermissionByIdResource = `${apiServer}${fetchPermissionByIdBase}`
} else {
  fetchUserByIdResource = "http://localhost:8080/users"
  fetchUserByEmailResource = "http://localhost:8000/users/email"
  fetchRoleByIdResource = "http://localhost:8000/roles"
  fetchPermissionByIdResource = "http://localhost:8000/permissions"
}

if (authServer) {
  const oauthEndpointBase = "/tokens"
  oauthEndpointResource = `${authServer}${oauthEndpointBase}`
} else {
  oauthEndpointResource = "http://localhost:9999/tokens"
}

const fetchHeaderConfig = {
  headers: {
    "content-type": "application/vnd.api+json",
  },
}

export {
  fetchUserByIdResource,
  fetchUserByEmailResource,
  fetchRoleByIdResource,
  fetchPermissionByIdResource,
  oauthEndpointResource,
  fetchHeaderConfig,
}
