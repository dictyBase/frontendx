import { Edit } from "../../features/EditablePages/Edit"
import { ACCESS } from "@dictybase/auth"

// eslint-disable-next-line unicorn/prefer-export-from, import/no-default-export
export default Edit
export const access = ACCESS.private
export const roles = ["content-admin"]
