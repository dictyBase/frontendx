const enableMock = async () => {
  const { worker } = await import("./browser")
  await worker.start({
    serviceWorker: {
      url: "/gene/mockServiceWorker.js",
    },
  })
}

export { enableMock }
