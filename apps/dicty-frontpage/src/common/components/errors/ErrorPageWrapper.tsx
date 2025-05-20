import { useNavigate } from "react-router-dom"
import { ApolloError } from "@apollo/client"
import { ErrorPage } from "@dictybase/ui-common"

type ErrorPageWrapperProperties = {
  error: ApolloError
}

const ErrorPageWrapper = ({ error }: ErrorPageWrapperProperties) => {
  const navigate = useNavigate()
  const handleNavigateHome = () => {
    router.push(process.env.NEXT_PUBLIC_FRONTPAGE_URL)
  }
  const handleReload = () => {
    router.reload()
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
