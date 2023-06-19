import { BrowseNews } from "news-component"
import NewsLayoutWrapper from "news-component/src/NewsLayout"
import { ACCESS } from "../../routes/types"

export default NewsLayoutWrapper(BrowseNews)

export const access = ACCESS.protected
