import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { match as Bmatch } from "fp-ts/boolean"
import { fromNullable as OfromNullable, match as Omatch } from "fp-ts/Option"
import {
  tryCatch as TEtryCatch,
  flatMap as TEflatMap,
  orElse as TEorElse,
  left as TEleft,
  right as TEright,
  type TaskEither,
} from "fp-ts/TaskEither"
import { match, P } from "ts-pattern"
import type { ApolloError } from "@apollo/client"
import { hasNotFoundError } from "@dictybase/ui-dsc"
import {
  StatusEnum,
  type CreateOrderMutationFn,
  type CreateOrderMutationVariables,
  type CreateUserInput,
  type CreateUserMutationFn,
  type CreateUserMutationVariables,
  type UpdateUserMutationFn,
  type UpdateUserMutationVariables,
  type UserByEmailLazyQueryHookResult,
  type UserInfoInput,
} from "dicty-graphql-schema"
import type { CatalogItem, ShippingFormData, PaymentFormData } from "./types"

type FormData = ShippingFormData & PaymentFormData

enum UserType {
  CONSUMER = "consumer",
  PAYER = "payer",
}

enum ErrorType {
  USER_NOT_FOUND,
  FETCH_USER_FAILURE,
  CREATE_USER_FAILURE,
  UPDATE_USER_FAILURE,
  CREATE_ORDER_FAILURE,
}

type SubmitOrderError = {
  errorType: ErrorType
  message: string
}

const userNotFoundError: SubmitOrderError = {
  errorType: ErrorType.USER_NOT_FOUND,
  message: "User not found",
}

const fetchUserError: SubmitOrderError = {
  errorType: ErrorType.FETCH_USER_FAILURE,
  message: "Could not fetch user",
}

const createUserError: SubmitOrderError = {
  errorType: ErrorType.CREATE_USER_FAILURE,
  message: "Could not create user",
}

const updateUserError: SubmitOrderError = {
  errorType: ErrorType.UPDATE_USER_FAILURE,
  message: "Could not update user",
}

const createOrderError: SubmitOrderError = {
  errorType: ErrorType.CREATE_ORDER_FAILURE,
  message: "Could not create order",
}

/**
 * getIDs creates a new array of just stock IDs.
 *
 * @param items - Array of catalog items in the cart.
 * @returns Array of stock ID strings.
 */
const getIDs = (items: Array<CatalogItem>): Array<string> =>
  pipe(
    items,
    Amap((item) => item.id),
  )

/**
 * Builds UserInfoInput for the consumer from shipping form data.
 *
 * @param formData - Shipping form data.
 * @returns UserInfoInput object for consumer.
 */
const getConsumerUserInfoInput = (
  formData: ShippingFormData,
): UserInfoInput => ({
  first_name: formData.firstName,
  last_name: formData.lastName,
  organization: formData.organization,
  first_address: formData.address1,
  second_address: formData.address2,
  city: formData.city,
  state: formData.state,
  zipcode: formData.zip,
  country: formData.country,
  phone: formData.phone,
})

/**
 * Builds UserInfoInput for the payer from payment form data.
 *
 * @param formData - Payment form data.
 * @returns UserInfoInput object for payer.
 */
const getPayerUserInfoInput = (formData: PaymentFormData): UserInfoInput => ({
  first_name: formData.payerFirstName,
  last_name: formData.payerLastName,
  organization: formData.payerOrganization,
  first_address: formData.payerAddress1,
  second_address: formData.payerAddress2,
  city: formData.payerCity,
  state: formData.payerState,
  zipcode: formData.payerZip,
  country: formData.payerCountry,
  phone: formData.payerPhone,
})

/**
 * Builds GraphQL UpdateUserInput variables for the consumer from shipping form data.
 *
 * @param formData - Shipping form data.
 * @returns UpdateUserInput object for consumer.
 */
const getConsumerUpdateVariables = (formData: ShippingFormData) => ({
  ...getConsumerUserInfoInput(formData),
  first_name: formData.firstName,
  last_name: formData.lastName,
  group_name: formData.lab,
  is_active: true,
})

/**
 * Builds GraphQL UpdateUserInput variables for the payer from payment form data.
 *
 * @param formData - Payment form data.
 * @returns UpdateUserInput object for payer.
 */
const getPayerUpdateVariables = (formData: PaymentFormData) => ({
  ...getPayerUserInfoInput(formData),
  first_name: formData.payerFirstName,
  last_name: formData.payerLastName,
  group_name: formData.payerLab,
  is_active: true,
})

/**
 * Builds GraphQL CreateUserInput variables for the consumer from shipping form data.
 *
 * @param formData - Shipping form data.
 * @returns CreateUserInput object for consumer.
 */
const getConsumerVariables = (formData: ShippingFormData): CreateUserInput => ({
  ...getConsumerUpdateVariables(formData),
  email: formData.email,
})

/**
 * Builds GraphQL CreateUserInput variables for the payer from payment form data.
 *
 * @param formData - Payment form data.
 * @returns CreateUserInput object for payer.
 */
const getPayerVariables = (formData: PaymentFormData): CreateUserInput => ({
  ...getPayerUpdateVariables(formData),
  email: formData.payerEmail,
})

/**
 * Generates mutation variables for creating a user.
 *
 * @param formData - Combined shipping and payment form data.
 * @param userType - Whether the user is the consumer or payer.
 * @returns Object containing CreateUserMutationVariables.
 */
const getCreateUserVariables = (
  formData: FormData,
  userType: string,
): { variables: CreateUserMutationVariables } => ({
  variables: {
    input: pipe(
      userType === UserType.CONSUMER,
      Bmatch(
        () => getPayerVariables(formData),
        () => getConsumerVariables(formData),
      ),
    ),
  },
})

/**
 * Generates mutation variables for updating an existing user.
 *
 * @param formData - Combined shipping and payment form data.
 * @param userType - Whether the user is the consumer or payer.
 * @param id - The existing user's ID.
 * @returns Object containing UpdateUserMutationVariables.
 */
const getUpdateUserVariables = (
  formData: FormData,
  userType: string,
  id: string,
): { variables: UpdateUserMutationVariables } => ({
  variables: {
    id,
    input: pipe(
      userType === UserType.CONSUMER,
      Bmatch(
        () => getPayerUpdateVariables(formData),
        () => getConsumerUpdateVariables(formData),
      ),
    ),
  },
})

/**
 * getUserVariables generates a variables object that is passed with
 * create or update user mutations.
 *
 * @param formData - Combined shipping and payment form data.
 * @param userType - Whether the user is the consumer or payer.
 * @param id - Optional user ID when updating an existing user.
 * @returns Variables object for createUser or updateUser mutation.
 */
const getUserVariables = (
  formData: FormData,
  userType: string,
  id?: string,
): {
  variables: CreateUserMutationVariables | UpdateUserMutationVariables
} =>
  pipe(
    id,
    OfromNullable,
    Omatch<
      string,
      { variables: CreateUserMutationVariables | UpdateUserMutationVariables }
    >(
      () => getCreateUserVariables(formData, userType),
      (userId) => getUpdateUserVariables(formData, userType, userId),
    ),
  )

/**
 * getOrderVariables generates a variables object that is sent with the
 * create order mutation.
 *
 * @param formData - Combined shipping and payment form data.
 * @param strainItems - Array of catalog items in the order.
 * @returns Object containing CreateOrderMutationVariables.
 */
const getOrderVariables = (
  formData: FormData,
  strainItems: Array<CatalogItem>,
): { variables: CreateOrderMutationVariables } => ({
  variables: {
    input: {
      courier: formData.shippingAccount,
      courier_account: formData.shippingAccountNumber,
      comments: formData.additionalInformation,
      payment: formData.paymentMethod,
      purchase_order_num: formData.purchaseOrderNum,
      status: StatusEnum.InPreparation,
      consumer: formData.email,
      consumer_info: getConsumerUserInfoInput(formData),
      payer: formData.payerEmail,
      payer_info: getPayerUserInfoInput(formData),
      purchaser: formData.email,
      items: getIDs(strainItems),
    },
  },
})

/**
 * Checks whether an unknown error contains a GraphQL NotFound error code.
 *
 * @param error - Unknown error object from Apollo or Promise rejection.
 * @returns True if the error contains a GraphQL NotFound error, false otherwise.
 */
const isNotFoundError = (error: unknown): boolean =>
  match(error)
    .with({ graphQLErrors: P.array() }, (apolloError) =>
      hasNotFoundError(apolloError as unknown as ApolloError),
    )
    .otherwise(() => false)

/**
 * Extracts a human-readable error message from an unknown error value.
 *
 * @param error - Unknown error value.
 * @param fallbackMessage - Fallback message when no specific error message is found.
 * @returns Extracted error message or the fallback message.
 */
const getErrorMessage = (error: unknown, fallbackMessage: string): string =>
  match(error)
    .with(
      { message: P.select(P.intersection(P.string, P.not(""))) },
      (message) => message,
    )
    .with(
      {
        graphQLErrors: [
          { message: P.select(P.intersection(P.string, P.not(""))) },
          ...P.array(),
        ],
      },
      (message) => message,
    )
    .with(P.intersection(P.string, P.not("")), (message) => message)
    .otherwise(() => fallbackMessage)

/**
 * Queries a user by email and extracts their user ID as a TaskEither.
 *
 * @param fetchUserByEmail - Apollo lazy query function from useUserByEmailLazyQuery.
 * @param email - User email address to look up.
 * @returns TaskEither resolving to the user ID string or a SubmitOrderError.
 */
const findUserByEmail = (
  fetchUserByEmail: UserByEmailLazyQueryHookResult[0],
  email: string,
): TaskEither<SubmitOrderError, string> => {
  console.log("finding user by email ", email)
  return pipe(
    TEtryCatch(
      async () => fetchUserByEmail({ variables: { email } }),
      (error): SubmitOrderError =>
        pipe(
          isNotFoundError(error),
          Bmatch<SubmitOrderError>(
            () => ({
              errorType: ErrorType.FETCH_USER_FAILURE,
              message: getErrorMessage(error, fetchUserError.message),
            }),
            () => userNotFoundError,
          ),
        ),
    ),
    TEflatMap((result) =>
      match(result)
        .with(
          { data: { userByEmail: { id: P.select(P.not(P.nullish)) } } },
          (id) => TEright(`${id}`),
        )
        .with({ error: P.when(isNotFoundError) }, () =>
          TEleft(userNotFoundError),
        )
        .with(
          {
            errors: P.when((errors) =>
              isNotFoundError({ graphQLErrors: errors }),
            ),
          },
          () => TEleft(userNotFoundError),
        )
        .with({ error: P.select(P.not(P.nullish)) }, (error) =>
          TEleft({
            errorType: ErrorType.FETCH_USER_FAILURE,
            message: getErrorMessage(error, fetchUserError.message),
          }),
        )
        .with({ errors: P.select(P.not(P.nullish)) }, (errors) =>
          TEleft({
            errorType: ErrorType.FETCH_USER_FAILURE,
            message: getErrorMessage(
              { graphQLErrors: errors },
              fetchUserError.message,
            ),
          }),
        )
        .otherwise(() => TEleft(fetchUserError)),
    ),
  )
}

/**
 * Executes the updateUser mutation wrapped in a TaskEither.
 *
 * @param updateUser - Apollo mutation function for updating a user.
 * @param formData - Combined shipping and payment form data.
 * @param userType - Whether the user is the consumer or payer.
 * @param id - The existing user's ID.
 * @returns TaskEither resolving to the mutation result or a SubmitOrderError.
 */
const executeUpdateUser = (
  updateUser: UpdateUserMutationFn,
  formData: FormData,
  userType: UserType,
  id: string,
): TaskEither<SubmitOrderError, unknown> =>
  pipe(
    TEtryCatch(
      async () => updateUser(getUpdateUserVariables(formData, userType, id)),
      (error) => ({
        errorType: ErrorType.UPDATE_USER_FAILURE,
        message: getErrorMessage(error, updateUserError.message),
      }),
    ),
    TEflatMap((result) =>
      match(result)
        .with({ errors: [P.not(P.nullish), ...P.array()] }, ({ errors }) =>
          TEleft({
            errorType: ErrorType.UPDATE_USER_FAILURE,
            message: getErrorMessage(
              { graphQLErrors: errors },
              updateUserError.message,
            ),
          }),
        )
        .otherwise((data) => TEright(data)),
    ),
  )

/**
 * Executes the createUser mutation wrapped in a TaskEither.
 *
 * @param createUser - Apollo mutation function for creating a user.
 * @param formData - Combined shipping and payment form data.
 * @param userType - Whether the user is the consumer or payer.
 * @returns TaskEither resolving to the mutation result or a SubmitOrderError.
 */
const executeCreateUser = (
  createUser: CreateUserMutationFn,
  formData: FormData,
  userType: UserType,
): TaskEither<SubmitOrderError, unknown> =>
  pipe(
    TEtryCatch(
      async () => createUser(getCreateUserVariables(formData, userType)),
      (error) => ({
        errorType: ErrorType.CREATE_USER_FAILURE,
        message: getErrorMessage(error, createUserError.message),
      }),
    ),
    TEflatMap((result) =>
      match(result)
        .with({ errors: [P.not(P.nullish), ...P.array()] }, ({ errors }) =>
          TEleft({
            errorType: ErrorType.CREATE_USER_FAILURE,
            message: getErrorMessage(
              { graphQLErrors: errors },
              createUserError.message,
            ),
          }),
        )
        .otherwise((data) => TEright(data)),
    ),
  )

/**
 * updateOrCreateUser attempts to find a user from our database via the user's
 * email address. If successful, it then updates the user with the current formData.
 * Otherwise, if NotFound, it adds a new user to our database.
 *
 * @param fetchUserByEmail - Apollo lazy query function from useUserByEmailLazyQuery.
 * @param formData - Combined shipping and payment form data.
 * @param updateUser - Apollo mutation function for updating a user.
 * @param createUser - Apollo mutation function for creating a user.
 * @param userType - Whether the user is the consumer or payer.
 * @returns TaskEither resolving to the user mutation result or a SubmitOrderError.
 */
const updateOrCreateUser = (
  fetchUserByEmail: UserByEmailLazyQueryHookResult[0],
  formData: FormData,
  updateUser: UpdateUserMutationFn,
  createUser: CreateUserMutationFn,
  userType: UserType,
): TaskEither<SubmitOrderError, unknown> => {
  const userEmail = pipe(
    userType === UserType.CONSUMER,
    Bmatch(
      () => formData.payerEmail,
      () => formData.email,
    ),
  )
  return pipe(
    findUserByEmail(fetchUserByEmail, userEmail),
    TEflatMap((id) => executeUpdateUser(updateUser, formData, userType, id)),
    TEorElse((lookupError) =>
      match(lookupError)
        .with({ errorType: ErrorType.USER_NOT_FOUND }, () =>
          executeCreateUser(createUser, formData, userType),
        )
        .otherwise((error) => {
          console.log(error, userType)
          return TEleft(error)
        }),
    ),
  )
}

/**
 * Executes the createOrder mutation and extracts the created order ID.
 *
 * @param createOrder - Apollo mutation function for creating an order.
 * @param formData - Combined shipping and payment form data.
 * @param items - Array of catalog items in the cart.
 * @returns TaskEither resolving to the created order ID string or a SubmitOrderError.
 */
const executeCreateOrder = (
  createOrder: CreateOrderMutationFn,
  formData: FormData,
  items: Array<CatalogItem>,
): TaskEither<SubmitOrderError, string> =>
  pipe(
    TEtryCatch(
      async () => createOrder(getOrderVariables(formData, items)),
      (error) => ({
        errorType: ErrorType.CREATE_ORDER_FAILURE,
        message: getErrorMessage(error, createOrderError.message),
      }),
    ),
    TEflatMap((orderData) =>
      match(orderData)
        .with(
          { data: { createOrder: { id: P.select(P.not(P.nullish)) } } },
          (id) => TEright(`${id}`),
        )
        .with({ errors: [P.not(P.nullish), ...P.array()] }, ({ errors }) =>
          TEleft({
            errorType: ErrorType.CREATE_ORDER_FAILURE,
            message: getErrorMessage(
              { graphQLErrors: errors },
              createOrderError.message,
            ),
          }),
        )
        .otherwise(() => TEleft(createOrderError)),
    ),
  )

export {
  UserType,
  ErrorType,
  getIDs,
  getUserVariables,
  getOrderVariables,
  updateOrCreateUser,
  executeCreateOrder,
  type FormData,
  type SubmitOrderError,
}
