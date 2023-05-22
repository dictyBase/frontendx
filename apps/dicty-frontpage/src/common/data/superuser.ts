const MockSuperuser = {
  id: "999",
  firstName: "Art",
  lastName: "Vandelay",
  email: "george@vandelayindustries.com",
  isActive: true,
  createdAt: 123_456,
  updatedAt: 678_900,
  roles: [
    {
      id: "1",
      name: "superuser",
      description: "total power!",
      createdAt: 123_456,
      updatedAt: 678_900,
      permissions: [
        {
          id: "1",
          level: "test",
          description: "a test permission",
          resource: "testresource",
          createdAt: 123_456,
          updatedAt: 678_900,
        },
      ],
    },
  ],
}

export default MockSuperuser
