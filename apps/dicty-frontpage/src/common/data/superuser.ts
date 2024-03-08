export const testPermission = {
  id: "1",
  level: "test",
  description: "a test permission",
  resource: "test resource",
  created_at: "123_456",
  updated_at: "678_900",
}

export const superuserRole = {
  id: "1",
  name: "superuser",
  description: "total power!",
  created_at: "123_456",
  updated_at: "678_900",
}

export const superuserProperties = {
  id: "999",
  first_name: "Art",
  last_name: "Vandelay",
  email: "george@vandelayindustries.com",
  isActive: true,
  created_at: "123_456",
  updated_at: "678_900",
}

export const mockSuperuser = {
  ...superuserProperties,
  roles: [{ ...superuserRole, permissions: [testPermission] }],
}
