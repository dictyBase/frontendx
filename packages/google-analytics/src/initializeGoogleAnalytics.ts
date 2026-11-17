declare global {
  interface Window {
    dataLayer: Array<any>
    gtag: (...arguments_: any) => void
  }
}

const initializeGoogleAnalytics = (trackingId: string) => {
  // eslint-disable-next-line github/no-dynamic-script-tag
  const script = document.createElement("script")
  script.setAttribute("async", "")
  script.setAttribute(
    "src",
    `https://www.googletagmanager.com/gtm.js?id=${trackingId}`,
  )
  document.head.append(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...arguments_) {
    window.dataLayer.push(arguments_)
  }
  window.gtag("js", new Date())
}

export { initializeGoogleAnalytics }
