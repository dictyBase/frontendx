import { useNavigate } from "react-router-dom"
import { ApolloError } from "@apollo/client"
import { ErrorPage } from "@dictybase/ui-common"

type ErrorPageWrapperProperties = {
  error: ApolloError
}

const ErrorPageWrapper = ({ error }: ErrorPageWrapperProperties) => {
  const navigate = useNavigate()
  const handleNavigateHome = () => {
    navigate(import.meta.env.VITE_APP_FRONTPAGE_URL)
  }
  const handleReload = () => {
    navigate(0)
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
