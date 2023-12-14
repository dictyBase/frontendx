import { Navigate, Outlet } from "react-router-dom"
import { useLogto } from "@logto/react"
import { useState, useEffect } from "react"
import { match } from "ts-pattern"
import { type UserWithRoles } from "./const"
import { LoadingDisplay } from "@dictybase/ui-dsc"
import { Eq } from "fp-ts/string"
import { getEq } from "fp-ts/Array"

type ConditionalRouteProperteies = {
  isLoading: boolean
  checkAuthorization: boolean
}

type PrivateProperties = { roles: Array<string> }

const conditionalRouting = (props: ConditionalRouteProperteies) =>
  match(props)
    .when(
      ({ isLoading }) => isLoading,
      () => <LoadingDisplay rows={6} />,
    )
    .when(
      ({ checkAuthorization }) => checkAuthorization,
      () => <Outlet />,
    )
    .otherwise(() => <Navigate to="/" />)

const Private = ({ roles }: PrivateProperties) => {
  const { fetchUserInfo } = useLogto()
  const [checkAuthorization, setAuthorization] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const authCheck = async () => {
      const authUser = (await fetchUserInfo()) as UserWithRoles
      if (authUser) {
        const resp = getEq(Eq).equals(authUser.roles, roles)
        setAuthorization(resp)
      }
      setLoading(false)
    }
    authCheck()
  }, [])
  return conditionalRouting({ isLoading, checkAuthorization })
}

export { Private }
