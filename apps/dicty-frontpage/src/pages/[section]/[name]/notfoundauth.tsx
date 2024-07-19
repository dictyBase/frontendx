import { NotFoundErrorAuth } from "../../../common/components/errors/NotFoundErrorAuth"
import { ACCESS } from "@dictybase/auth"

// eslint-disable-next-line unicorn/prefer-export-from, import/no-default-export
export default NotFoundErrorAuth
export const access = ACCESS.private
export const roles = ["content-admin"]
