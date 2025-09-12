import { useNavigate } from "react-router-dom"
import { ApolloError } from "@apollo/client"
import { ErrorPage } from "@dictybase/ui-common"

type ErrorPageWrapperProperties = {
  error: ApolloError
}

const ErrorPageWrapper = ({ error }: ErrorPageWrapperProperties) => {
  const navigate = useNavigate()
  const handleNavigateHome = () => {
    window.location.href = import.meta.env.VITE_FRONTPAGE_URL
  }
  const handleReload = () => {
    window.location.reload()
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
