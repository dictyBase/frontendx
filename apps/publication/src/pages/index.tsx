import React from "react"
import { useRouter } from "next/router"
import { PublicationLoader } from "../components/PublicationLoader"

const Home = () => {
  const router = useRouter()
  React.useEffect(() => {
    router.push("/26088819")
  }, [router])

  return <PublicationLoader />
}

// eslint-disable-next-line import/no-default-export
export default Home
