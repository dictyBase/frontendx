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
import { NAMESPACE } from "../common/constants/namespace"
import { superuserProperties } from "../common/data/superuser"
import { generateMockNews } from "./generateMockNews"

const database = new BrowserLevel<string, Content>(NAMESPACE, {
  valueEncoding: "json",
})

const handlers = [
  mockCreateContentMutation(async (request, response, context) => {
    const { name, content, namespace, created_by } = request.variables.input
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
      return response(context.data({ createContent: created }))
    } catch {
      return response(context.status(500))
    }
  }),
  mockContentBySlugQuery(async (request, response, context) => {
    const { slug } = request.variables
    try {
      const allNews = await database.values().all()
      const contentBySlug = allNews.find((content) => content.slug === slug)
      if (!contentBySlug) return response(context.status(404))
      return response(context.data({ contentBySlug }))
    } catch {
      return response(context.status(500))
    }
  }),
  mockUpdateContentMutation(async (request, response, context) => {
    const { id, content, updated_by } = request.variables.input
    try {
      const existingContent = await database.get(id)
      await database.put(id, {
        ...existingContent,
        content,
        updated_by: { ...superuserProperties, email: updated_by },
        updated_at: formatISO(new Date()),
      })
      const updateContent = await database.get(id)
      return response(context.data({ updateContent }))
    } catch {
      return response(context.status(500))
    }
  }),
  mockDeleteContentMutation(async (request, response, context) => {
    const { id } = request.variables
    try {
      await database.del(id)
      return response(context.data({ deleteContent: { success: true } }))
    } catch {
      return response(context.status(500))
    }
  }),
  mockListContentByNamespaceQuery((_, response, context) => {
    const mockNews = generateMockNews(15)
    return response(context.data({ listContentByNamespace: mockNews }))
  }),
]

export { handlers }
