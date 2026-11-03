import { ACCESS } from "@dictybase/auth-mui5"
import CatalogSearch from "../catalog"

const StrainCatalogPage = () => <CatalogSearch entity="strain" />

// eslint-disable-next-line import/no-default-export
export default StrainCatalogPage
export const access = ACCESS.public
