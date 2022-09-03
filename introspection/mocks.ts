import { graphql, ResponseResolver, GraphQLRequest, GraphQLContext } from 'msw'

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLoginMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ login })
 *   )
 * })
 */
export const mockLoginMutation = (resolver: ResponseResolver<GraphQLRequest<LoginMutationVariables>, GraphQLContext<LoginMutation>, any>) =>
  graphql.mutation<LoginMutation, LoginMutationVariables>(
    'Login',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLogoutMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ logout })
 *   )
 * })
 */
export const mockLogoutMutation = (resolver: ResponseResolver<GraphQLRequest<LogoutMutationVariables>, GraphQLContext<LogoutMutation>, any>) =>
  graphql.mutation<LogoutMutation, LogoutMutationVariables>(
    'Logout',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateContentMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createContent })
 *   )
 * })
 */
export const mockCreateContentMutation = (resolver: ResponseResolver<GraphQLRequest<CreateContentMutationVariables>, GraphQLContext<CreateContentMutation>, any>) =>
  graphql.mutation<CreateContentMutation, CreateContentMutationVariables>(
    'CreateContent',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateContentMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ updateContent })
 *   )
 * })
 */
export const mockUpdateContentMutation = (resolver: ResponseResolver<GraphQLRequest<UpdateContentMutationVariables>, GraphQLContext<UpdateContentMutation>, any>) =>
  graphql.mutation<UpdateContentMutation, UpdateContentMutationVariables>(
    'UpdateContent',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateOrderMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createOrder })
 *   )
 * })
 */
export const mockCreateOrderMutation = (resolver: ResponseResolver<GraphQLRequest<CreateOrderMutationVariables>, GraphQLContext<CreateOrderMutation>, any>) =>
  graphql.mutation<CreateOrderMutation, CreateOrderMutationVariables>(
    'CreateOrder',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateUserMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createUser })
 *   )
 * })
 */
export const mockCreateUserMutation = (resolver: ResponseResolver<GraphQLRequest<CreateUserMutationVariables>, GraphQLContext<CreateUserMutation>, any>) =>
  graphql.mutation<CreateUserMutation, CreateUserMutationVariables>(
    'CreateUser',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateUserMutation((req, res, ctx) => {
 *   const { id, input } = req.variables;
 *   return res(
 *     ctx.data({ updateUser })
 *   )
 * })
 */
export const mockUpdateUserMutation = (resolver: ResponseResolver<GraphQLRequest<UpdateUserMutationVariables>, GraphQLContext<UpdateUserMutation>, any>) =>
  graphql.mutation<UpdateUserMutation, UpdateUserMutationVariables>(
    'UpdateUser',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetRefreshTokenQuery((req, res, ctx) => {
 *   const { token } = req.variables;
 *   return res(
 *     ctx.data({ getRefreshToken })
 *   )
 * })
 */
export const mockGetRefreshTokenQuery = (resolver: ResponseResolver<GraphQLRequest<GetRefreshTokenQueryVariables>, GraphQLContext<GetRefreshTokenQuery>, any>) =>
  graphql.query<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>(
    'GetRefreshToken',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockContentBySlugQuery((req, res, ctx) => {
 *   const { slug } = req.variables;
 *   return res(
 *     ctx.data({ contentBySlug })
 *   )
 * })
 */
export const mockContentBySlugQuery = (resolver: ResponseResolver<GraphQLRequest<ContentBySlugQueryVariables>, GraphQLContext<ContentBySlugQuery>, any>) =>
  graphql.query<ContentBySlugQuery, ContentBySlugQueryVariables>(
    'contentBySlug',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockContentQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ content })
 *   )
 * })
 */
export const mockContentQuery = (resolver: ResponseResolver<GraphQLRequest<ContentQueryVariables>, GraphQLContext<ContentQuery>, any>) =>
  graphql.query<ContentQuery, ContentQueryVariables>(
    'content',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListOrganismsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ listOrganisms })
 *   )
 * })
 */
export const mockListOrganismsQuery = (resolver: ResponseResolver<GraphQLRequest<ListOrganismsQueryVariables>, GraphQLContext<ListOrganismsQuery>, any>) =>
  graphql.query<ListOrganismsQuery, ListOrganismsQueryVariables>(
    'ListOrganisms',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGeneQuery((req, res, ctx) => {
 *   const { gene, limit, sort_by } = req.variables;
 *   return res(
 *     ctx.data({ allStrains, gene, allPublications, allOrthologs, listGeneProductInfo, generalInformation, getAssociatedSequnces, getLinks, getProteinInformation })
 *   )
 * })
 */
export const mockGeneQuery = (resolver: ResponseResolver<GraphQLRequest<GeneQueryVariables>, GraphQLContext<GeneQuery>, any>) =>
  graphql.query<GeneQuery, GeneQueryVariables>(
    'Gene',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentGenesQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentGenes })
 *   )
 * })
 */
export const mockListRecentGenesQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentGenesQueryVariables>, GraphQLContext<ListRecentGenesQuery>, any>) =>
  graphql.query<ListRecentGenesQuery, ListRecentGenesQueryVariables>(
    'ListRecentGenes',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPublicationQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ publication })
 *   )
 * })
 */
export const mockPublicationQuery = (resolver: ResponseResolver<GraphQLRequest<PublicationQueryVariables>, GraphQLContext<PublicationQuery>, any>) =>
  graphql.query<PublicationQuery, PublicationQueryVariables>(
    'Publication',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentPublicationsQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentPublications })
 *   )
 * })
 */
export const mockListRecentPublicationsQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentPublicationsQueryVariables>, GraphQLContext<ListRecentPublicationsQuery>, any>) =>
  graphql.query<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>(
    'ListRecentPublications',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStrainListQuery((req, res, ctx) => {
 *   const { cursor, limit, filter } = req.variables;
 *   return res(
 *     ctx.data({ listStrains })
 *   )
 * })
 */
export const mockStrainListQuery = (resolver: ResponseResolver<GraphQLRequest<StrainListQueryVariables>, GraphQLContext<StrainListQuery>, any>) =>
  graphql.query<StrainListQuery, StrainListQueryVariables>(
    'StrainList',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListStrainsWithPhenotypeQuery((req, res, ctx) => {
 *   const { cursor, limit, type, annotation } = req.variables;
 *   return res(
 *     ctx.data({ listStrainsWithAnnotation })
 *   )
 * })
 */
export const mockListStrainsWithPhenotypeQuery = (resolver: ResponseResolver<GraphQLRequest<ListStrainsWithPhenotypeQueryVariables>, GraphQLContext<ListStrainsWithPhenotypeQuery>, any>) =>
  graphql.query<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>(
    'ListStrainsWithPhenotype',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListBacterialStrainsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ listStrainsWithAnnotation, listStrainsWithAnnotation })
 *   )
 * })
 */
export const mockListBacterialStrainsQuery = (resolver: ResponseResolver<GraphQLRequest<ListBacterialStrainsQueryVariables>, GraphQLContext<ListBacterialStrainsQuery>, any>) =>
  graphql.query<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>(
    'ListBacterialStrains',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListStrainsInventoryQuery((req, res, ctx) => {
 *   const { cursor, limit } = req.variables;
 *   return res(
 *     ctx.data({ listStrainsWithAnnotation })
 *   )
 * })
 */
export const mockListStrainsInventoryQuery = (resolver: ResponseResolver<GraphQLRequest<ListStrainsInventoryQueryVariables>, GraphQLContext<ListStrainsInventoryQuery>, any>) =>
  graphql.query<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>(
    'ListStrainsInventory',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListPlasmidsInventoryQuery((req, res, ctx) => {
 *   const { cursor, limit } = req.variables;
 *   return res(
 *     ctx.data({ listPlasmidsWithAnnotation })
 *   )
 * })
 */
export const mockListPlasmidsInventoryQuery = (resolver: ResponseResolver<GraphQLRequest<ListPlasmidsInventoryQueryVariables>, GraphQLContext<ListPlasmidsInventoryQuery>, any>) =>
  graphql.query<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>(
    'ListPlasmidsInventory',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPlasmidListFilterQuery((req, res, ctx) => {
 *   const { cursor, limit, filter } = req.variables;
 *   return res(
 *     ctx.data({ listPlasmids })
 *   )
 * })
 */
export const mockPlasmidListFilterQuery = (resolver: ResponseResolver<GraphQLRequest<PlasmidListFilterQueryVariables>, GraphQLContext<PlasmidListFilterQuery>, any>) =>
  graphql.query<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>(
    'PlasmidListFilter',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPlasmidQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ plasmid })
 *   )
 * })
 */
export const mockPlasmidQuery = (resolver: ResponseResolver<GraphQLRequest<PlasmidQueryVariables>, GraphQLContext<PlasmidQuery>, any>) =>
  graphql.query<PlasmidQuery, PlasmidQueryVariables>(
    'Plasmid',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStrainQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ strain })
 *   )
 * })
 */
export const mockStrainQuery = (resolver: ResponseResolver<GraphQLRequest<StrainQueryVariables>, GraphQLContext<StrainQuery>, any>) =>
  graphql.query<StrainQuery, StrainQueryVariables>(
    'Strain',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentPlasmidsQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentPlasmids })
 *   )
 * })
 */
export const mockListRecentPlasmidsQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentPlasmidsQueryVariables>, GraphQLContext<ListRecentPlasmidsQuery>, any>) =>
  graphql.query<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>(
    'ListRecentPlasmids',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentStrainsQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentStrains })
 *   )
 * })
 */
export const mockListRecentStrainsQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentStrainsQueryVariables>, GraphQLContext<ListRecentStrainsQuery>, any>) =>
  graphql.query<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>(
    'ListRecentStrains',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserByEmailQuery((req, res, ctx) => {
 *   const { email } = req.variables;
 *   return res(
 *     ctx.data({ userByEmail })
 *   )
 * })
 */
export const mockUserByEmailQuery = (resolver: ResponseResolver<GraphQLRequest<UserByEmailQueryVariables>, GraphQLContext<UserByEmailQuery>, any>) =>
  graphql.query<UserByEmailQuery, UserByEmailQueryVariables>(
    'UserByEmail',
    resolver
  )
