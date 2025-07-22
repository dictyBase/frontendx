import React from "react"
import { useRouter } from "next/router"
import { match } from "ts-pattern"
import { Loader } from "../components/Loader"

const Home = () => {
  const router = useRouter()
  React.useEffect(() => {
    match(router.asPath)
      .with("/", () => router.replace("/ada2"))
      .otherwise((geneId) => router.replace(geneId))
  }, [router])

  return <Loader />
}

// eslint-disable-next-line import/no-default-export
export default Home
