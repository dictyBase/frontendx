import { Editable } from "../../../features/EditablePages/Editable"
import { ACCESS } from "@dictybase/auth"

// eslint-disable-next-line unicorn/prefer-export-from, import/no-default-export
export default Editable
export const access = ACCESS.private
export const roles = ["content-admin"]
