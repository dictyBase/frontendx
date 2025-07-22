import { ACCESS } from "@dictybase/auth"
import { Edit } from "../../features/EditablePages/Edit"

// eslint-disable-next-line unicorn/prefer-export-from, import/no-default-export
export default Edit
export const access = ACCESS.private
export const roles = ["content-admin"]
