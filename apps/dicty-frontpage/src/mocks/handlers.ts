// src/mocks/handlers.js
import {
  mockListRecentPublicationsQuery,
  mockListRecentGenesQuery,
  mockListRecentPlasmidsQuery,
  mockListRecentStrainsQuery,
  mockContentBySlugQuery,
  mockListOrganismsQuery,
  mockLoginMutation,
  mockGetRefreshTokenQuery,
} from "dicty-graphql-schema"
import listRecentPublications from "../common/data/mockPublications"
import listRecentPlasmids from "../common/data/mockPlasmids"
import listRecentStrains from "../common/data/mockStrains"
import listRecentGenes from "../common/data/mockGenes"
import listOrganisms from "../common/data/mockDownloadsData"
import MockSuperuser from "../common/data/superuser"
import contentBySlug from "../common/data/mockContentBySlug"

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
    const content = contentBySlug[slug]

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

    return response(
      context.data({
        contentBySlug: contentBySlug[slug],
        slug,
      }),
    )
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
]

export default handlers
