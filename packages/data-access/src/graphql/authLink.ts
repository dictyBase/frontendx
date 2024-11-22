import { setContext } from "@apollo/client/link/context"

const mutationList = new Set(["Logout", "CreateContent", "UpdateContent"])
const isMutation = (value: string) => mutationList.has(value)

const authLink = setContext((request, { headers }) => {
  const mutation = isMutation(request.operationName || "")
  return {
    headers: {
      ...headers,
      "X-GraphQL-Method": mutation ? "Mutation" : "Query",
    },
  }
})

export { authLink }
