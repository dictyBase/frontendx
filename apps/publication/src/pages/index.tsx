import React from "react"
import { useRouter } from "next/router"
import { match } from "ts-pattern"
import { PublicationLoader } from "../components/PublicationLoader"

const Home = () => {
  const router = useRouter()

  React.useEffect(() => {
    match(router.asPath)
      .with("/", () => router.replace("/26088819"))
      .otherwise((publicationId) => router.replace(publicationId))
  }, [router])

  return <PublicationLoader />
}

// eslint-disable-next-line import/no-default-export
export default Home
