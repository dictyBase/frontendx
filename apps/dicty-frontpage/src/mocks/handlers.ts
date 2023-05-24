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
  mockDeleteContentMutation,
  mockUpdateContentMutation,
} from "dicty-graphql-schema"
import database from "./database"
import listRecentPublications from "../common/data/mockPublications"
import listRecentPlasmids from "../common/data/mockPlasmids"
import listRecentStrains from "../common/data/mockStrains"
import listRecentGenes from "../common/data/mockGenes"
import listOrganisms from "../common/data/mockDownloadsData"
import { MockSuperuser } from "../common/data/superuser"

const dataBaseErrorMessage = "Database Error."

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

  mockContentBySlugQuery((request, response, context) => {
    const { slug } = request.variables

    try {
      const content = database.content.findFirst({
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      if (!content)
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

      if (!content.updatedBy)
        return response(
          context.errors([
            {
              message: dataBaseErrorMessage,
              extensions: {
                code: "NotFound",
              },
            },
          ]),
        )

      return response(
        context.data({
          contentBySlug: {
            slug: content.slug,
            id: content.id,
            content: content.content,
            name: content.name,
            updatedAt: content.updatedAt,
            updatedBy: content.updatedBy,
          },
        }),
      )
    } catch (error) {
      return response(
        context.errors([{ message: dataBaseErrorMessage, error }]),
      )
    }
  }),

  mockLoginMutation((request, response, context) =>
    response(
      context.data({
        login: {
          user: MockSuperuser,
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
          user: MockSuperuser,
          identity: {
            provider: "google",
          },
        },
      }),
    )
  }),
  mockListNewsContentQuery((request, response, context) => {
    const listNewsContent = database.content.findMany({
      where: {
        namespace: {
          equals: "news",
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
    return response(
      context.data({
        listContent: listNewsContent,
      }),
    )
  }),

  mockCreateContentMutation((request, response, context) => {
    const { name, slug, createdBy, content, namespace } =
      request.variables.input
    const date = new Date().toISOString()
    try {
      const user = database.user.findFirst({
        where: { email: { equals: createdBy } },
      })
      if (!user) throw new Error("User not found.")
      const created = database.content.create({
        id: nanoid(),
        name,
        slug,
        content,
        namespace,
        createdBy: user,
        updatedBy: user,
        createdAt: date,
        updatedAt: date,
      })
      return response(
        context.data({
          createContent: {
            slug: created.slug,
            name: created.name,
            content: created.content,
            createdBy: user,
            namespace: created.namespace,
          },
        }),
      )
    } catch (error) {
      return response(
        context.errors([{ message: dataBaseErrorMessage, error }]),
      )
    }
  }),

  mockDeleteContentMutation((request, response, context) => {
    const { id } = request.variables
    if (!id) return response(context.errors([{ message: "ID not provided." }]))
    try {
      database.content.delete({ where: { id: { equals: id } } })
      return response(
        context.data({
          deleteContent: {
            id,
            success: true,
          },
        }),
      )
    } catch (error) {
      return response(
        context.errors([{ message: dataBaseErrorMessage, error }]),
      )
    }
  }),

  mockUpdateContentMutation((request, response, context) => {
    const { id, content, updatedBy } = request.variables.input
    const date = new Date().toISOString()

    if (!id) return response(context.errors([{ message: "ID not provided." }]))
    try {
      const updatingUser = database.user.findFirst({
        where: { email: { equals: updatedBy } },
      })
      if (!updatingUser) throw new Error("User not found.")
      const updated = database.content.update({
        where: { id: { equals: id } },
        data: {
          content,
          updatedBy: updatingUser,
          updatedAt: date,
        },
      })
      if (!updated) throw new Error("Update failed.")
      return response(
        context.data({
          updateContent: {
            id,
            content: updated.content,
            updatedBy: { id: updatingUser.id },
          },
        }),
      )
    } catch (error) {
      return response(context.errors([{ message: "Database Error", error }]))
    }
  }),
]

export default handlers
