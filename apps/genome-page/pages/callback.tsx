import { useHandleSignInCallback } from "@logto/react"
import { useRouter } from "next/router"
import { LoadingDisplay } from "@dictybase/ui-common"

/**
 * Callback component
 *
 * This component is responsible for handling the callback after a successful sign-in.
 * It renders a loading display until the sign-in process is completed.
 */
const Callback = () => {
  const router = useRouter()
  const { isLoading } = useHandleSignInCallback(() => {
    router.push("/")
  })
  return isLoading ? <LoadingDisplay rows={5} /> : <></>
}

// eslint-disable-next-line import/no-default-export
export default Callback
