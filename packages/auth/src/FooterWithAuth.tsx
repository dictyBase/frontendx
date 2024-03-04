import { Footer } from "@dictybase/footer"
import { displayOnAuthorized } from "./functional/auth"
import { useAuthorization } from "./useAuthorization"
import { authFooterItems } from "./data/authFooterData"

const authorizedRoles = ["content-admin"]

const FooterWithAuth = () => {
  const { isAuthorized } = useAuthorization({
    entries: authorizedRoles,
  })
  return displayOnAuthorized({
    isAuthorized,
    authorized: <Footer data={authFooterItems} />,
    unauthorized: <Footer />,
  })
}

export { FooterWithAuth }
