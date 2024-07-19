declare global {
  interface Window {
    dataLayer: Array<any>
    gtag: (...args: any) => void
  }
}

const initializeGoogleAnalytics = (trackingId: string) => {
  // eslint-disable-next-line github/no-dynamic-script-tag
  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
  document.body.append(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag("js", new Date())
  window.gtag("config", trackingId) 
}

export { initializeGoogleAnalytics }
