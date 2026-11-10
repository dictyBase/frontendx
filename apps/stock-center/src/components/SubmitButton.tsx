import { useState, type SyntheticEvent } from "react"
import { pipe } from "fp-ts/function"
import { match as Ematch } from "fp-ts/Either"
import { Do as TEDo, bind as TEbind, map as TEmap } from "fp-ts/TaskEither"
import Button from "@mui/material/Button"
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import { useSetAtom, useAtomValue } from "jotai"
import { getCartTotal } from "@dictybase/ui-dsc"
import {
  useCreateOrderMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUserByEmailLazyQuery,
} from "dicty-graphql-schema"
import {
  shippingFormAtom,
  paymentFormAtom,
  orderAtom,
  submitErrorAtom,
} from "../orderState"
import { cartAtom, resetCartAtom } from "../cartState"
import {
  UserType,
  updateOrCreateUser,
  executeCreateOrder,
} from "../submitOrder"

/**
 * SubmitButton is the button used to submit the order. It
 * appears on the last page of the order form, and it contains the
 * necessary logic for GraphQL queries and mutations.
 */
const SubmitButton = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
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
  const [createUser, createUserResults] = useCreateUserMutation()
  const [updateUser, updateUserResults] = useUpdateUserMutation()
  const [fetchUserByEmail, results] = useUserByEmailLazyQuery()
  console.log("createUser", createUserResults)
  console.log("updateUser", updateUserResults)
  console.log("userbyemail: ", results)

  const handleClose = (
    _event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return
    setSnackbarOpen(false)
  }

  const handleSubmit = async () => {
    const submitTask = pipe(
      TEDo,
      TEbind("consumer", () =>
        updateOrCreateUser(
          fetchUserByEmail,
          formData,
          updateUser,
          createUser,
          UserType.CONSUMER,
        ),
      ),
      TEbind("payer", () =>
        updateOrCreateUser(
          fetchUserByEmail,
          formData,
          updateUser,
          createUser,
          UserType.PAYER,
        ),
      ),
      TEbind("orderID", () =>
        executeCreateOrder(createOrder, formData, allItems),
      ),
      TEmap(({ orderID }) => orderID),
    )

    const result = await submitTask()
    pipe(
      result,
      Ematch(
        ({ message }) => {
          setSubmitError(true)
          setErrorMessage(message)
          setSnackbarOpen(true)
        },
        (orderID) => {
          setSubmitError(false)
          setOrder({
            orderID,
            formData,
            cartItems: allItems,
            cartTotal: getCartTotal(allItems),
          })
          history(`/order/submitted/${orderID}`)
          emptyCart()
        },
      ),
    )
  }

  return (
    <>
      <Button
        aria-label="Submit"
        type="submit"
        size="large"
        variant="contained"
        color="secondary"
        sx={{ maxWidth: "200px" }}
        endIcon={<FontAwesomeIcon icon="check-circle" />}
        onClick={handleSubmit}>
        Submit Order
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export { SubmitButton }
