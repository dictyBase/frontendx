import { useState, useEffect } from "react"
import { useLogto, UserInfoResponse } from "@logto/react"

const useTokenAndUser = (resource: string) => {
  const { fetchUserInfo, getAccessToken, isAuthenticated } = useLogto()
  const [token, setToken] = useState<string>()
  const [user, setUser] = useState<UserInfoResponse>()
  useEffect(() => {
    const getUserData = async () => {
      if (!isAuthenticated) return
      setToken(await getAccessToken(resource))
      setUser(await fetchUserInfo())
    }

    getUserData()
  }, [fetchUserInfo, getAccessToken, isAuthenticated, resource])
  return { token, user }
}

export { useTokenAndUser }
