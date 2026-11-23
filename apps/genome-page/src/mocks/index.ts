const enableMock = async () => {
  if (typeof window === "undefined") {
    //    const { server } = await import("./server")
    //    server.listen()
  } else {
    const { default: worker } = await import("./browser")
    await worker.start({
      serviceWorker: {
        url: "/gene/mockServiceWorker.js",
      },
    })
  }
}

export { enableMock }
