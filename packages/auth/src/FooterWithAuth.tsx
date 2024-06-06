import { Footer } from "@dictybase/footer"
import { displayOnAuthorized } from "./functional/auth"
import { useAuthorization } from "./useAuthorization"
import { createAuthFooterItems, createFooterItems } from "./data/authFooterData"

const authorizedRoles = ["content-admin"]

type FooterWithAuthProperties = {
  frontPageUrl: string
  stockCenterUrl: string
}

const FooterWithAuth = ({
  frontPageUrl,
  stockCenterUrl,
}: FooterWithAuthProperties) => {
  const { isAuthorized } = useAuthorization({
    entries: authorizedRoles,
  })
  return displayOnAuthorized({
    isAuthorized,
    authorized: (
      <Footer data={createAuthFooterItems({ frontPageUrl, stockCenterUrl })} />
    ),
    unauthorized: (
      <Footer data={createFooterItems({ frontPageUrl, stockCenterUrl })} />
    ),
  })
}

export { FooterWithAuth }
