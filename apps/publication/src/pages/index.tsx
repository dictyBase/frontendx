import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { match } from "ts-pattern"
import { PublicationLoader } from "../components/PublicationLoader"

const Home = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  React.useEffect(() => {
    match(pathname)
      .with("/", () => navigate("/26088819"))
      .otherwise((publicationId) => navigate(publicationId))
  }, [navigate, pathname])

  return <PublicationLoader />
}

// eslint-disable-next-line import/no-default-export
export default Home
