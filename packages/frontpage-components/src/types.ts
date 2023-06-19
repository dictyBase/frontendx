import { User, Role, Permission, Maybe } from "dicty-graphql-schema"

type UpdatedByUser = Pick<User, "id" | "email" | "firstName" | "lastName"> & {
  roles?: Maybe<
    Array<
      { __typename?: "Role" } & Pick<Role, "name"> & {
          permissions?: Maybe<
            Array<
              { __typename?: "Permission" } & Pick<
                Permission,
                "level" | "resource"
              >
            >
          >
        }
    >
  >
}

export default UpdatedByUser
