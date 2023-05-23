import { factory, primaryKey, oneOf, manyOf, nullable } from "@mswjs/data"
import listNewsContent from "../common/data/mockListNewsContent"
import {
  testPermission,
  superUserRole,
  MockSuperuser,
} from "../common/data/superuser"

const database = factory({
  user: {
    id: primaryKey(String),
    firstName: String,
    lastName: String,
    email: String,
    // groupName: nullable(String),
    // organization: nullable(String),
    // firstAddress: nullable(String),
    // secondAddress: nullable(String),
    // city: nullable(String),
    // state: nullable(String),
    // zipcode: nullable(String),
    // country: nullable(String),
    // phone: nullable(String),
    isActive: Boolean,
    createdAt: Date,
    updatedAt: Date,
    roles: nullable(manyOf("role")),
  },
  role: {
    id: primaryKey(String),
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
    permissions: nullable(manyOf("permission")),
  },
  permission: {
    id: primaryKey(String),
    level: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
    resource: String,
  },
  content: {
    id: primaryKey(String),
    slug: String,
    name: String,
    content: String,
    createdBy: oneOf("user"),
    createdAt: Date,
    updatedBy: oneOf("user"),
    updatedAt: Date,
    namespace: String,
  },
})

const initializeMockNewsData = () => {
  const permissions = database.permission.create(testPermission)
  const roles = database.role.create({
    ...superUserRole,
    permissions: [permissions],
  })
  const user = database.user.create({ ...MockSuperuser, roles: [roles] })
  listNewsContent.forEach((item) =>
    database.content.create({ ...item, createdBy: user, updatedBy: user }),
  )
}

initializeMockNewsData()

export default database
