import { ACCESS } from "@dictybase/auth-mui5"
import CatalogSearch from "../catalog"

const PlasmidCatalogPage = () => <CatalogSearch entity="plasmid" />

// eslint-disable-next-line import/no-default-export
export default PlasmidCatalogPage
export const access = ACCESS.public
