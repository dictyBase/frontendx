import { UpdateNews } from "news-component"
import NewsLayoutWrapper from "news-component/src/NewsLayout"
import { ACCESS } from "../../../routes/types"

export default NewsLayoutWrapper(UpdateNews)
export const access = ACCESS.private
