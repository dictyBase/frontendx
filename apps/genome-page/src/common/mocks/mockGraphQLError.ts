const mockNotFoundError = {
  errors: [
    {
      message: "could not find gene with ID banana",
      path: ["gene"],
      extensions: { code: "NotFound" },
      locations: undefined,
      nodes: undefined,
      source: undefined,
      positions: undefined,
      originalError: undefined,
      name: "",
    },
  ],
}

export { mockNotFoundError }
