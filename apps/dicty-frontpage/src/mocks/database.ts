import { factory, primaryKey } from "@mswjs/data"
import listNewsContent from "../common/data/mockListNewsContent"

const database = factory({
  news: {
    id: primaryKey(String),
    slug: String,
    name: String,
    content: String,
    updatedAt: String,
    namespace: () => "news",
  },
})

const initializeMockNewsData = () => {
  listNewsContent.forEach((item) => database.news.create(item))
}

initializeMockNewsData()

export default database
