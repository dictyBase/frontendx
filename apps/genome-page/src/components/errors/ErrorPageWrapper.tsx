import { useRouter } from "next/router"
import { ApolloError } from "@apollo/client"
import { ErrorPage } from "@dictybase/ui-common"

type ErrorPageWrapperProperties = {
  error: ApolloError
}

const ErrorPageWrapper = ({ error }: ErrorPageWrapperProperties) => {
  const router = useRouter()
  const handleNavigateHome = () => {
    router.push(import.meta.env.VITE_FRONTPAGE_URL)
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
