declare global {
  interface Window {
    dataLayer: Array<any>
    gtag: (...arguments_: any) => void
  }
}

const initializeGoogleAnalytics = (trackingId: string) => {
  // eslint-disable-next-line github/no-dynamic-script-tag
  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
  document.body.append(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...arguments_) {
    window.dataLayer.push(arguments_)
  }
  window.gtag("js", new Date())
  window.gtag("config", trackingId)

  // https://web.dev/articles/bfcache#analytics
  window.addEventListener("pageshow", (event) => {
    if (event.persisted === true) {
      const { protocol, hostname, pathname } = window.location
      window.gtag("event", "page_view", {
        page_location: protocol + hostname + pathname,
      })
    }
  })
}

export { initializeGoogleAnalytics }
