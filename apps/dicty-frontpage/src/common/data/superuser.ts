export const testPermission = {
  id: "1",
  level: "test",
  description: "a test permission",
  resource: "test resource",
  createdAt: "123_456",
  updatedAt: "678_900",
}

export const superuserRole = {
  id: "1",
  name: "superuser",
  description: "total power!",
  createdAt: "123_456",
  updatedAt: "678_900",
}

export const superuserProperties = {
  id: "999",
  firstName: "Art",
  lastName: "Vandelay",
  email: "george@vandelayindustries.com",
  isActive: true,
  createdAt: "123_456",
  updatedAt: "678_900",
}

export const mockSuperuser = {
  ...superuserProperties,
  roles: [{ ...superuserRole, permissions: [testPermission] }],
}
