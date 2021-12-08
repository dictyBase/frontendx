import type { AppProps } from "next/app"

function PublicationApp({ Component, pageProps }: AppProps) {
  return (
    <div className="test">
      <h1>Hello</h1>
      <Component {...pageProps} />
    </div>
  )
}

export default PublicationApp
