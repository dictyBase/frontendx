import { Footer } from "@dictybase/footer"
import { match } from "ts-pattern"
import { displayOnAuthorized, useAuthorization, authFooterData } from "auth"
import { Loader } from "../../common/components/Loader"

const authorizedRoles = ["content-admin"]

const FooterWithAuth = () => {
  const { isAuthorized, isLoading } = useAuthorization({
    entries: authorizedRoles,
  })
  return match(isLoading)
    .with(true, () => <Loader />)
    .with(false, () =>
      displayOnAuthorized({
        isAuthorized,
        authorized: <Footer data={authFooterData} />,
        unauthorized: <Footer />,
      }),
    )
    .exhaustive()
}

export { FooterWithAuth }
