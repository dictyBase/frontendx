import React from "react"
import { useRouter } from "next/router"

function Home() {
  const router = useRouter()
  React.useEffect(() => {
    router.push("/26088819")
  }, [])
  return <></>
}

export default Home
