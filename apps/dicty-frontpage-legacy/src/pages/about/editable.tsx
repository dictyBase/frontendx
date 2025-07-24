import { ACCESS } from "@dictybase/auth"
import { Editable } from "../../features/EditablePages/Editable"

// eslint-disable-next-line unicorn/prefer-export-from, import/no-default-export
export default Editable
export const access = ACCESS.private
export const roles = ["content-admin"]
