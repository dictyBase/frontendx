import { Footer } from "@dictybase/footer"
import { displayOnAuthorized } from "./functional/auth"
import { useAuthorization } from "./useAuthorization"
import authFooterData from "./data/authFooterData.json"

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
