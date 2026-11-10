import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  tryCatch as TEtryCatch,
  flatMap as TEflatMap,
  left as TEleft,
  right as TEright,
  type TaskEither,
} from "fp-ts/TaskEither"
import { match, P } from "ts-pattern"
import {
  StatusEnum,
  type CreateOrderMutationFn,
  type CreateOrderMutationVariables,
  type UserInfoInput,
} from "dicty-graphql-schema"
import type { CatalogItem, ShippingFormData, PaymentFormData } from "./types"

type FormData = ShippingFormData & PaymentFormData

enum ErrorType {
  CREATE_ORDER_FAILURE,
}

type SubmitOrderError = {
  errorType: ErrorType
  message: string
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
 * getOrderVariables generates a variables object that is sent with the
 * create order mutation.
 *
 * @param formData - Combined shipping and payment form data.
 * @param items - Array of catalog items in the order.
 * @returns Object containing CreateOrderMutationVariables.
 */
const getOrderVariables = (
  formData: FormData,
  items: Array<CatalogItem>,
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
      items: getIDs(items),
    },
  },
})

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
  ErrorType,
  getIDs,
  getConsumerUserInfoInput,
  getPayerUserInfoInput,
  getOrderVariables,
  executeCreateOrder,
  type FormData,
  type SubmitOrderError,
}
