// src/mocks/handlers.js
// import { nanoid } from "nanoid"
// import {
//   mockCreateContentMutation,
//   mockDeleteContentBySlugMutation,
//   mockUpdateContentMutation,
// } from "dicty-graphql-schema"
// import slugify from "slugify"
import { graphql } from "msw"
// import { database } from "../database"
// import { mockSuperuser } from "../common/data/superuser"

// const databaseErrorMessage = "Database Error."

const privateHandlers = [
  // eslint-disable-next-line consistent-return
  graphql.operation((_, response, context) => {
    const isAuthenticated = true
    if (!isAuthenticated) {
      return response(context.errors([{ message: "Unauthorized" }]))
    }
  }),
]
// mockCreateContentMutation(async (request, response, context) => {
//   const { name, slug, content, namespace } = request.variables.input
//   const date = new Date().toISOString()
//   const created = {
//     id: nanoid(),
//     slug,
//     name,
//     createdBy: mockSuperuser,
//     createdAt: date,
//     updatedBy: mockSuperuser,
//     updatedAt: date,
//     content,
//     namespace,
//   }
//   try {
//     await database.put(slug, JSON.stringify(created))
//     return response(
//       context.data({
//         createContent: created,
//       }),
//     )
//   } catch (error) {
//     return response(
//       context.errors([{ message: databaseErrorMessage, error }]),
//     )
//   }
// }),
//
// mockDeleteContentBySlugMutation(async (request, response, context) => {
//   const { slug } = request.variables
//   if (!slug)
//     return response(context.errors([{ message: "slug not provided." }]))
//   try {
//     const data = await database.get(slug)
//     const content = JSON.parse(data)
//     await database.del(slug)
//     return response(
//       context.data({
//         deleteContentBySlug: { id: content.id, success: true },
//       }),
//     )
//   } catch (error) {
//     return response(
//       context.errors([{ message: databaseErrorMessage, error }]),
//     )
//   }
// }),
//
// mockUpdateContentMutation(async (request, response, context) => {
//   const { name, slug, content } = request.variables.input
//   const date = new Date().toISOString()
//   try {
//     const data = await database.get(slug)
//     const newSlug = slugify(name, { lower: true })
//     const previous = JSON.parse(data)
//     if (newSlug !== slug) {
//       await database.del(previous.slug)
//     }
//     const updated = {
//       ...previous,
//       name,
//       content,
//       slug: newSlug,
//       updatedBy: mockSuperuser,
//       updatedAt: date,
//     }
//     await database.put(updated.slug, JSON.stringify(updated))
//     return response(
//       context.data({
//         updateContent: {
//           id: updated.id,
//           name: updated.name,
//           slug: updated.slug,
//           updatedBy: updated.updatedBy.id,
//           content: updated.content,
//         },
//       }),
//     )
//   } catch (error) {
//     return response(
//       context.errors([{ message: databaseErrorMessage, error }]),
//     )
//   }
//})

export { privateHandlers }
