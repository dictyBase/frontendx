import React from "react"
import { useRouter } from "next/router"
import Loader from "../components/Loader"

const Home = () => {
  const router = useRouter()
  React.useMemo(() => {
    router.push("/gene/sadA")
  }, [router])
  return <Loader />
}

export default Home
