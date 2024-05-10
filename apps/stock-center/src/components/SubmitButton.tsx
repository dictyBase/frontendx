import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import {
  useCreateOrderMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUserByEmailQuery,
  StatusEnum,
} from "dicty-graphql-schema"
import { useSetAtom, useAtomValue } from "jotai"
import { getCartTotal } from "@dictybase/ui-dsc"
import {
  shippingFormAtom,
  paymentFormAtom,
  orderAtom,
  submitErrorAtom,
} from "../orderState"
import {
  cartAtom,
  resetCartAtom,
} from "../cartState"
import type { CatalogItem, ShippingFormData, PaymentFormData } from "../types"

/**
 * getIDs creates a new array of just stock IDs
 */
const getIDs = (items: Array<CatalogItem>) =>
  items.map((item: CatalogItem) => item.id)

const getConsumerVariables = (formData: ShippingFormData) => ({
  first_name: formData.firstName,
  last_name: formData.lastName,
  email: formData.email,
  organization: formData.organization,
  group_name: formData.lab,
  first_address: formData.address1,
  second_address: formData.address2,
  city: formData.city,
  state: formData.state,
  zipcode: formData.zip,
  country: formData.country,
  phone: formData.phone,
  is_active: true,
})

const getPayerVariables = (formData: PaymentFormData) => ({
  first_name: formData.payerFirstName,
  last_name: formData.payerLastName,
  email: formData.payerEmail,
  organization: formData.payerOrganization,
  group_name: formData.payerLab,
  first_address: formData.payerAddress1,
  second_address: formData.payerAddress2,
  city: formData.payerCity,
  state: formData.payerState,
  zipcode: formData.payerZip,
  country: formData.payerCountry,
  phone: formData.payerPhone,
  is_active: true,
})

/**
 * getUserVariables generates a variables object that is passed with
 * create or update user mutations.
 */
const getUserVariables = (
  formData: ShippingFormData & PaymentFormData,
  userType: string,
  id?: string,
) => {
  const inputVals =
    userType === "consumer"
      ? getConsumerVariables(formData)
      : getPayerVariables(formData)
  const variablesObject: any = {
    variables: {
      input: inputVals,
    },
  }
  // if there's an ID, that means we need to send an update mutation;
  // add ID to variables and remove email (since this cannot be updated)
  if (id) {
    variablesObject.variables.id = id
    delete variablesObject.variables.input.email
  }
  return variablesObject
}

/**
 * getOrderVariables generates a variables object that is sent with the
 * create order mutation.
 */
const getOrderVariables = (
  formData: ShippingFormData & PaymentFormData,
  strainItems: Array<CatalogItem>,
) => ({
  variables: {
    input: {
      courier: formData.shippingAccount,
      courier_account: formData.shippingAccountNumber,
      comments: formData.additionalInformation,
      payment: formData.paymentMethod,
      purchase_order_num: formData.purchaseOrderNum,
      status: StatusEnum.InPreparation,
      consumer: formData.email,
      payer: formData.payerEmail,
      purchaser: formData.email,
      items: getIDs(strainItems),
    },
  },
})

/**
 * updateOrCreateUser attempts to find a user from our database via the consumer's
 * email address. If successful, it then updates the user with the current formData.
 * Otherwise, it adds a new user to our database.
 */
const updateOrCreateUser = async (
  refetch: Function,
  formData: ShippingFormData & PaymentFormData,
  updateUser: Function,
  createUser: Function,
  setSubmitError: Function,
  userType: string,
) => {
  const userEmail =
    userType === "consumer" ? formData.email : formData.payerEmail
  try {
    const user = await refetch({
      email: userEmail,
    })
    return await updateUser(
      getUserVariables(formData, userType, user.data.userByEmail.id),
    )
  } catch (error: any) {
    const notFound = error.graphQLErrors[0].extensions.code === "NotFound"
    if (notFound) {
      return createUser(getUserVariables(formData, userType))
    }
    setSubmitError(error)
    return new Error(error.message)
  }
}

const useStyles = makeStyles(() => ({
  button: {
    minWidth: "200px",
  },
}))

/**
 * SubmitButton is the button used to submit the order. It
 * appears on the last page of the order form, and it contains the
 * necessary logic for GraphQL queries and mutations.
 */
const SubmitButton = () => {
  const { strainItems, plasmidItems } = useAtomValue(cartAtom)
  const allItems = [...strainItems, ...plasmidItems]
  const shippingFormData = useAtomValue(shippingFormAtom)
  const paymentFormData = useAtomValue(paymentFormAtom)
  const setOrder = useSetAtom(orderAtom)
  const formData = { ...shippingFormData, ...paymentFormData }
  const emptyCart = useSetAtom(resetCartAtom)
  const setSubmitError = useSetAtom(submitErrorAtom)
  const history = useNavigate()
  const [createOrder] = useCreateOrderMutation()
  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation()
  const { refetch } = useUserByEmailQuery({
    variables: { email: formData.email },
    skip: true, // skip initial fetch, we only want to fetch on button click
  })
  const classes = useStyles()

  const handleSubmit = async () => {
    try {
      // update or create consumer
      await updateOrCreateUser(
        refetch,
        formData,
        updateUser,
        createUser,
        setSubmitError,
        "consumer",
      )
      // update or create payer
      await updateOrCreateUser(
        refetch,
        formData,
        updateUser,
        createUser,
        setSubmitError,
        "payer",
      )
      const orderData = await createOrder(getOrderVariables(formData, allItems))
      const orderID = orderData?.data?.createOrder?.id
      setOrder({
        orderID: orderID || "",
        formData,
        cartItems: allItems,
        cartTotal: getCartTotal(allItems),
      })
      history(`/order/submitted/${orderID}`)
      emptyCart()
    } catch {
      setSubmitError(true)
    }
  }

  return (
    <Button
      aria-label="Submit"
      type="submit"
      size="large"
      variant="contained"
      color="primary"
      className={classes.button}
      endIcon={<FontAwesomeIcon icon="check-circle" />}
      onClick={handleSubmit}>
      Submit Order
    </Button>
  )
}

export { SubmitButton, getUserVariables, getIDs }
