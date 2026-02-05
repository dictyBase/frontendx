type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  roles: Array<{
    id: number
    name: string
    permissions?: Array<{
      id: number
      permission: string
      resource: string
    }>
  }>
}

export type { User }
