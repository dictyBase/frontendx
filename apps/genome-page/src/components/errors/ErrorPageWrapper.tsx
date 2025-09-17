import { useNavigate } from "react-router-dom"
import { ApolloError } from "@apollo/client"
import { ErrorPage } from "@dictybase/ui-common"

type ErrorPageWrapperProperties = {
  error: ApolloError
}

const handleReload = () => {
  window.location.reload()
}

const ErrorPageWrapper = ({ error }: ErrorPageWrapperProperties) => {
  const navigate = useNavigate()
  const handleNavigateHome = () => {
    navigate(import.meta.env.VITE_FRONTPAGE_URL)
  }
  return (
    <ErrorPage
      error={error}
      handleNavigateHome={handleNavigateHome}
      handleReload={handleReload}
    />
  )
}

export { ErrorPageWrapper }
