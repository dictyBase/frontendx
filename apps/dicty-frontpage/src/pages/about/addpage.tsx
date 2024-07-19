import { ACCESS } from "@dictybase/auth"
import { AddPage } from "../../features/EditablePages/AddPage"

// eslint-disable-next-line unicorn/prefer-export-from, import/no-default-export
export default AddPage
export const access = ACCESS.private
export const roles = ["content-admin"]
