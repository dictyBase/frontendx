import { BrowserLevel } from "browser-level"
import listNewsContent from "../common/data/mockListNewsContent"
import { mockSuperuser } from "../common/data/superuser"

export const database = new BrowserLevel("dicty-frontpage", {
  valueEncoding: "json",
})

export const getContentDataByKey = async (key: string) => {
  try {
    const data = await database.get(key)
    return JSON.parse(data)
  } catch {
    const data = await database.get("default")
    return JSON.parse(data)
  }
}

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
