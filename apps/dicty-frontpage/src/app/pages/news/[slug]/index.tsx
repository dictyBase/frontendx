import NewsLayoutWrapper from "news-component/src/NewsLayout"
import { NewsPage } from "news-component"
import { ACCESS } from "../../../routes/types"

export default NewsLayoutWrapper(NewsPage)
export const access = ACCESS.protected
