// src/mocks/handlers.js
import { nanoid } from "nanoid"
import {
  mockListRecentPublicationsQuery,
  mockListRecentGenesQuery,
  mockListRecentPlasmidsQuery,
  mockListRecentStrainsQuery,
  mockContentBySlugQuery,
  mockListOrganismsQuery,
  mockLoginMutation,
  mockGetRefreshTokenQuery,
  mockListNewsContentQuery,
  mockCreateContentMutation,
  mockDeleteContentBySlugMutation,
  mockUpdateContentMutation,
} from "dicty-graphql-schema"
import slugify from "slugify"
import database from "../database"
import listRecentPublications from "../common/data/mockPublications"
import listRecentPlasmids from "../common/data/mockPlasmids"
import listRecentStrains from "../common/data/mockStrains"
import listRecentGenes from "../common/data/mockGenes"
import listOrganisms from "../common/data/mockDownloadsData"
import { mockSuperuser } from "../common/data/superuser"

const databaseErrorMessage = "Database Error."

const handlers = [
  // Handles a "GetUserInfo" query
  mockListRecentPublicationsQuery((request, response, context) => {
    const { limit } = request.variables

    if (limit === 4) {
      return response(
        context.data({
          listRecentPublications,
        }),
      )
    }
    return response(context.data({}))
  }),

  mockListRecentGenesQuery((request, response, context) => {
    const { limit } = request.variables

    if (limit === 4) {
      return response(
        context.data({
          listRecentGenes,
        }),
      )
    }
    return response(context.data({}))
  }),

  mockListRecentPlasmidsQuery((request, response, context) => {
    const { limit } = request.variables

    if (limit === 4) {
      return response(
        context.data({
          listRecentPlasmids,
        }),
      )
    }
    return response(context.data({}))
  }),

  mockListRecentStrainsQuery((request, response, context) => {
    const { limit } = request.variables

    if (limit === 4) {
      return response(
        context.data({
          listRecentStrains,
        }),
      )
    }
    return response(context.data({}))
  }),

  mockListOrganismsQuery((request, response, context) =>
    response(context.data({ listOrganisms })),
  ),

  mockContentBySlugQuery(async (request, response, context) => {
    const { slug } = request.variables
    try {
      const data = await database.get(slug)
      const contentBySlug = JSON.parse(data)
      if (!contentBySlug)
        return response(
          context.errors([
            {
              message: "Page Content Not Found.",
              extensions: {
                code: "NotFound",
              },
            },
          ]),
        )

      if (!contentBySlug.updatedBy)
        return response(
          context.errors([
            {
              message: databaseErrorMessage,
              extensions: {
                code: "NotFound",
              },
            },
          ]),
        )

      return response(
        context.data({
          contentBySlug,
        }),
      )
    } catch (error) {
      return response(
        context.errors([{ message: databaseErrorMessage, error }]),
      )
    }
  }),

  mockLoginMutation((request, response, context) =>
    response(
      context.data({
        login: {
          user: mockSuperuser,
          token:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjo1NTE2MjM5MDIyfQ.Twt1dSBv6Jha3dqWvyUWI4G_ySJsWTD3av30TDtsnyIBPgXwVM3KtPA_YaDw-iO9pfFWZXc2wFUQ6q5WjNwy14yf7IEf2-r_r78jn9tq8a-vSmlr3ieK-Wjg6Y_U8pa4ZXy2zdrtf7IxA2Jz25Vj-BKtW7z_D00qm6EqSGT46fs9Dh0e1zcuCfOwq-STMLFzIbdcpOzvgtyVfyo-P89qhBWooTBt11xR0HeEr5_gJMThXBLtgzT6t_FYzQj3GadPvUQg3gf3qsPOCYk5TNlTIzJXD6yNtncF1MGSpacKTXJFTi3zf_zzpFkBmftPPEicqJo0CrqGO66JdJby8RZE1w",
          identity: {
            provider: request.variables.input.provider,
          },
        },
      }),
    ),
  ),

  mockGetRefreshTokenQuery((request, response, context) => {
    if (!request.variables.token) {
      return response(
        context.errors([{ message: "No Refresh Token Provided" }]),
      )
    }

    return response(
      context.data({
        refreshToken: {
          token:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjo1NTE2MjM5MDIyfQ.Twt1dSBv6Jha3dqWvyUWI4G_ySJsWTD3av30TDtsnyIBPgXwVM3KtPA_YaDw-iO9pfFWZXc2wFUQ6q5WjNwy14yf7IEf2-r_r78jn9tq8a-vSmlr3ieK-Wjg6Y_U8pa4ZXy2zdrtf7IxA2Jz25Vj-BKtW7z_D00qm6EqSGT46fs9Dh0e1zcuCfOwq-STMLFzIbdcpOzvgtyVfyo-P89qhBWooTBt11xR0HeEr5_gJMThXBLtgzT6t_FYzQj3GadPvUQg3gf3qsPOCYk5TNlTIzJXD6yNtncF1MGSpacKTXJFTi3zf_zzpFkBmftPPEicqJo0CrqGO66JdJby8RZE1w",
          user: mockSuperuser,
          identity: {
            provider: "google",
          },
        },
      }),
    )
  }),

  mockListNewsContentQuery(async (request, response, context) => {
    const listNewsData = await database.values({ limit: 50 }).all()
    const listNewsContent = listNewsData.map((article) => JSON.parse(article))
    return response(
      context.data({
        listContent: listNewsContent,
      }),
    )
  }),

  mockCreateContentMutation(async (request, response, context) => {
    const { name, slug, content, namespace } = request.variables.input
    const date = new Date().toISOString()
    const created = {
      id: nanoid(),
      slug,
      name,
      createdBy: mockSuperuser,
      createdAt: date,
      updatedBy: mockSuperuser,
      updatedAt: date,
      content,
      namespace,
    }
    try {
      await database.put(slug, JSON.stringify(created))
      return response(
        context.data({
          createContent: created,
        }),
      )
    } catch (error) {
      return response(
        context.errors([{ message: databaseErrorMessage, error }]),
      )
    }
  }),

  mockDeleteContentBySlugMutation(async (request, response, context) => {
    const { slug } = request.variables
    if (!slug)
      return response(context.errors([{ message: "slug not provided." }]))
    try {
      const data = await database.get(slug)
      const content = JSON.parse(data)
      await database.del(slug)
      return response(
        context.data({
          deleteContentBySlug: { id: content.id, success: true },
        }),
      )
    } catch (error) {
      return response(
        context.errors([{ message: databaseErrorMessage, error }]),
      )
    }
  }),

  mockUpdateContentMutation(async (request, response, context) => {
    const { name, slug, content } = request.variables.input
    const date = new Date().toISOString()
    try {
      const data = await database.get(slug)
      const newSlug = slugify(name, { lower: true })
      const previous = JSON.parse(data)
      if (newSlug !== slug) {
        await database.del(previous.slug)
      }
      const updated = {
        ...previous,
        name,
        content,
        slug: newSlug,
        updatedBy: mockSuperuser,
        updatedAt: date,
      }
      await database.put(updated.slug, JSON.stringify(updated))
      return response(
        context.data({
          updateContent: {
            id: updated.id,
            name: updated.name,
            slug: updated.slug,
            updatedBy: updated.updatedBy.id,
            content: updated.content,
          },
        }),
      )
    } catch (error) {
      return response(
        context.errors([{ message: databaseErrorMessage, error }]),
      )
    }
  }),
]

export default handlers
