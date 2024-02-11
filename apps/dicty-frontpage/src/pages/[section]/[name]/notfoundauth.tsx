import { NotFoundErrorAuth } from "../../../common/components/errors/NotFoundErrorAuth"
import { ACCESS } from "../../../app/routes/types"

// eslint-disable-next-line unicorn/prefer-export-from, import/no-default-export
export default NotFoundErrorAuth
export const access = ACCESS.public
export const roles = ["content-admin"]
