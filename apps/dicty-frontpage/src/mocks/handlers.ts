import { HttpResponse, passthrough } from "msw"
import { BrowserLevel } from "browser-level"
import {
  mockListContentByNamespaceQuery,
  mockCreateContentMutation,
  mockContentBySlugQuery,
  mockUpdateContentMutation,
  mockDeleteContentMutation,
  Content,
} from "dicty-graphql-schema/types/mocks"
import { formatISO } from "date-fns"
import { pipe } from "fp-ts/function"
import { startsWith as SstartsWith } from "fp-ts/string"
import { filter as Afilter } from "fp-ts/Array"
import { NAMESPACE } from "../common/constants/namespace"
import { superuserProperties } from "../common/data/superuser"

const database = new BrowserLevel<string, Content>(NAMESPACE, {
  valueEncoding: "json",
})

const errorMessage = "Internal Server Error"

const handlers = [
  mockCreateContentMutation(async ({ variables }) => {
    const { name, content, namespace, created_by } = variables.input
    if (namespace !== "news") return passthrough()
    const contentAdmin = { ...superuserProperties, email: created_by }
    const now = formatISO(new Date())
    try {
      await database.put(name, {
        __typename: "Content",
        id: name,
        name,
        namespace,
        slug: `${namespace}-${name}`,
        content,
        created_by: contentAdmin,
        updated_by: contentAdmin,
        created_at: now,
        updated_at: now,
      })
      const created = await database.get(name)
      return HttpResponse.json({ data: { createContent: created } })
    } catch {
      return HttpResponse.json(
        { errors: [{ message: errorMessage }] },
        { status: 500 },
      )
    }
  }),
  mockContentBySlugQuery(async ({ variables }) => {
    const { slug } = variables
    const isNewsNamespace = pipe(slug, SstartsWith("news"))
    if (!isNewsNamespace) return passthrough()
    try {
      const allNews = await database.values().all()
      const contentBySlug = allNews.find((content) => content.slug === slug)
      if (!contentBySlug)
        return HttpResponse.json(
          { errors: [{ message: "Content not found" }] },
          { status: 404 },
        )
      return HttpResponse.json({ data: { contentBySlug } })
    } catch {
      return HttpResponse.json(
        { errors: [{ message: errorMessage }] },
        { status: 500 },
      )
    }
  }),
  mockUpdateContentMutation(async ({ variables }) => {
    const { id, content, updated_by } = variables.input
    try {
      const existingContent = await database.get(id)
      await database.put(id, {
        ...existingContent,
        content,
        updated_by: { ...superuserProperties, email: updated_by },
        updated_at: formatISO(new Date()),
      })
      const updateContent = await database.get(id)
      return HttpResponse.json({ data: { updateContent } })
    } catch {
      return passthrough()
    }
  }),
  mockDeleteContentMutation(async ({ variables }) => {
    const { id } = variables
    try {
      await database.del(id)
      return HttpResponse.json({ data: { deleteContent: { success: true } } })
    } catch {
      return HttpResponse.json(
        { errors: [{ message: errorMessage }] },
        { status: 500 },
      )
    }
  }),
  mockListContentByNamespaceQuery(async () => {
    const listContentByNamespace = await database.values().all()
    const newsContent = pipe(
      listContentByNamespace,
      Afilter(({ namespace }) => namespace === "news"),
    )
    return HttpResponse.json({ data: { listContentByNamespace: newsContent } })
  }),
]

export { handlers }
