import { downloadLinks } from "../linkLists"
import { HomepageColumn } from "./HomepageColumn"

const FileLinks = () => (
  <HomepageColumn title="Downloads" entries={downloadLinks} />
)

export { FileLinks }
