import React from "react"
import { useRouter } from "next/router"
import PublicationLoader from "../components/PublicationLoader"

const Home = () => {
  const router = useRouter()
  React.useEffect(() => {
    router.push("/26088819")
  }, [])

  return <PublicationLoader />
}

export default Home
