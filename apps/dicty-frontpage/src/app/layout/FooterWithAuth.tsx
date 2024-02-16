import { Footer } from "@dictybase/footer"
import { displayOnAuthorized, useAuthorization, authFooterData } from "auth"

const authorizedRoles = ["content-admin"]

const FooterWithAuth = () => {
  const { isAuthorized } = useAuthorization({
    entries: authorizedRoles,
  })
  return displayOnAuthorized({
    isAuthorized,
    authorized: <Footer data={authFooterData} />,
    unauthorized: <Footer />,
  })
}

export { FooterWithAuth }
