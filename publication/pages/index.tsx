import React from "react"
import { useRouter } from "next/router"

const Home = () => {
  const router = useRouter()
  React.useEffect(() => {
    router.push("/26088819")
  }, [])

  return <></>
}

export default Home
