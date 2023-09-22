import { useHandleSignInCallback } from "@logto/react"
import { LoadingDisplay } from "@dictybase/ui-dsc"

const Callback = () => {
  const { isLoading } = useHandleSignInCallback(() => {})
  return isLoading ? <LoadingDisplay rows={5} /> : <></>
}

export default Callback
