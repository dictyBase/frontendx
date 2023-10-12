import {
  tryCatch as TEtryCatch,
  map as TEmap,
  flatMap as TEflatMap,
} from "fp-ts/TaskEither"
import { toError, Either, of as Eof } from "fp-ts/Either"
import { pipe } from "fp-ts/function"
import { map as Amap, of as Aof } from "fp-ts/Array"
import { useMemo, useEffect, useState } from "react"
import LogtoClient from "@logto/browser"

type useRoleProperties = {
  userId: string
  endpoint: string
}

type fetchRolesProperties = useRoleProperties & {
  client: LogtoClient
}

type rolesFromAPIProperties = useRoleProperties & {
  accessToken: string
}
type roleProperties = {
  tenantId: string
  id: string
  name: string
  description: string
}

const resolveAccessTokens = (client: LogtoClient) =>
  pipe(
    TEtryCatch(() => client.getIdToken(), toError),
    TEmap((token) => token as string),
  )

const toJson = (resp: Response) =>
  pipe(TEtryCatch(() => resp.json() as Promise<Array<roleProperties>>, toError))

const rolesFromAPI = ({
  userId,
  endpoint,
  accessToken,
}: rolesFromAPIProperties) =>
  pipe(
    TEtryCatch(
      () =>
        fetch(`${endpoint}/api/users/${userId}/roles`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      toError,
    ),
  )

const roleNames = (roles: Array<roleProperties>) =>
  pipe(
    roles,
    Amap((r) => r.name),
  )

const fetchRoles = ({ userId, endpoint, client }: fetchRolesProperties) =>
  pipe(
    resolveAccessTokens(client),
    TEflatMap((accessToken) => rolesFromAPI({ userId, endpoint, accessToken })),
    TEflatMap(toJson),
    TEmap(roleNames),
  )

const useRole = ({ endpoint, userId }: useRoleProperties) => {
  const client = useMemo(
    () =>
      new LogtoClient({
        endpoint,
        appId: import.meta.env.VITE_LOGTO_APPID,
      }),
    [endpoint],
  )
  const [eitherRoles, setEitherRoles] = useState<Either<Error, Array<string>>>(
    Eof(Aof("")),
  )
  const fetchRoleCallback = useMemo(
    () => fetchRoles({ endpoint, userId, client }),
    [endpoint, userId, client],
  )

  useEffect(() => {
    const runner = async () => setEitherRoles(await fetchRoleCallback())
    const runner2 = async () => {
      const token = await client.getAccessToken(
        "https://content.dictybase.dev/api",
      )
      // eslint-disable-next-line no-console
      console.log("token token %s", token)
    }
    runner()
    runner2()
  }, [fetchRoleCallback, client])
  return eitherRoles
}

export { useRole }
