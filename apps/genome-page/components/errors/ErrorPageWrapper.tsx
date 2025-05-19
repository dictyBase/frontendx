import { useRouter } from "next/router"
import { ApolloError } from "@apollo/client"
import { GraphQLErrorPage } from "@dictybase/ui-common"

type ErrorPageWrapperProperties = {
  error: ApolloError
}

const ErrorPageWrapper = ({ error }: ErrorPageWrapperProperties) => {
  const router = useRouter()
  const handleNavigateHome = () => {
    router.push(process.env.NEXT_PUBLIC_FRONTPAGE_URL)
  }
  return (
    <GraphQLErrorPage error={error} handleNavigateHome={handleNavigateHome} />
  )
}

export { ErrorPageWrapper }
