import { BrowserLevel } from "browser-level"
import listNewsContent from "../common/data/mockListNewsContent"
import { mockSuperuser } from "../common/data/superuser"

const database = new BrowserLevel("dicty-frontpage", { valueEncoding: "json" })

if (import.meta.env.VITE_APP_SEED_MOCK) {
  const seed = async () => {
    database.batch(
      listNewsContent.map((article) => ({
        type: "put",
        key: article.slug,
        value: JSON.stringify({
          ...article,
          createdBy: mockSuperuser,
          updatedBy: mockSuperuser,
        }),
      })),
    )
  }

  seed()
}

export default database
