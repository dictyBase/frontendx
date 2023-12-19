import { useLogto } from "@logto/react"
import { useState, useEffect } from "react"
import { matchEntries } from "./functional"
import { type UserWithRoles } from "./const"

type useAuthorizationProperties = { entries: Array<string> }

const useAuthorization = ({ entries }: useAuthorizationProperties) => {
  const { fetchUserInfo } = useLogto()
  const [isAuthorized, setAuthorization] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const authCheck = async (entries: Array<string>) => {
      const authUser = (await fetchUserInfo()) as UserWithRoles
      if (authUser) {
        setAuthorization(matchEntries(authUser.roles, entries))
      }
      setLoading(false)
    }
    authCheck(entries)
  }, [entries])
  return { isAuthorized, isLoading }
}

export { useAuthorization }
