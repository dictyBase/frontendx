import Grid from "@mui/material/Grid"
import { map as Amap } from "fp-ts/Array"
import { pipe } from "fp-ts/function"
import { match } from "ts-pattern"
import { CartTotalRow } from "./cart/CartTotalRow"
import { type Cart } from "./types"
import { getCartTotal } from "./utils/getCartTotal"
import { convertToPayerField } from "./utils/convertToPayerField"
import { shippingAddressFields } from "./order/addressFields"
import { CountryDropdown } from "./order/CountryDropdown"
import { PhoneNumberInput } from "./order/PhoneNumberInput"
import { PanelWrapper } from "./order/PanelWrapper"
import { StyledGridContainer } from "./order/StyledGridContainer"
import { TextField } from "./order/TextField"

const renderStrainTotal = ({ strainItems }: Cart) => (
  <CartTotalRow
    leftValue="Strains"
    numItems={strainItems.length}
    total={getCartTotal(strainItems)}
    variant="body2"
  />
)

// @ts-ignore
const renderPlasmidTotal = ({ plasmidItems }: Cart) => (
  <CartTotalRow
    leftValue="Plasmids"
    numItems={plasmidItems.length}
    total={getCartTotal(plasmidItems)}
    variant="body2"
  />
)

// @ts-ignore
const renderStrainAndPlasmidTotals = ({ strainItems, plasmidItems }: Cart) => (
  <>
    <CartTotalRow
      leftValue="Strains"
      numItems={strainItems.length}
      total={getCartTotal(strainItems)}
      variant="body2"
    />
    <CartTotalRow
      leftValue="Plasmids"
      numItems={plasmidItems.length}
      total={getCartTotal(plasmidItems)}
      variant="body2"
    />
  </>
)

// @ts-ignore

const renderCartTotal = ({ strainItems = [], plasmidItems = [] }: Cart) => {
  const cumulative = [...strainItems, ...plasmidItems]
  return (
    <CartTotalRow
      leftValue="Total"
      numItems={cumulative.length}
      total={getCartTotal(cumulative)}
      variant="body2"
    />
  )
}

type AddressField = {
  name: string
  label: string
}

const gridContainerWrapper = (elements: Array<JSX.Element>) => (
  <StyledGridContainer>{elements}</StyledGridContainer>
)

// eslint-disable-next-line react/function-component-definition
const panelWrapper = (title: string) => (element: JSX.Element) => (
  <PanelWrapper title={title}>{element}</PanelWrapper>
)

const isCountry = ({ name }: { name: string }) => /country/i.test(name)
const isPhoneNumber = ({ name }: { name: string }) => /phone/i.test(name)

const wrapAddressTextField = ({ name, label }: AddressField) => (
  <Grid key={name} item>
    <TextField name={name} label={label} />
  </Grid>
)

const wrapCountryDropdown = ({ name }: { name: string }) => (
  <CountryDropdown fieldName={name} />
)

const wrapPhoneNumberInput = ({ name, label }: AddressField) => (
  <PhoneNumberInput name={name} label={label} />
)

const renderAddressFields = (addressFields: Array<AddressField>) =>
  pipe(
    addressFields,
    Amap((field) =>
      match(field)
        .when(isCountry, wrapCountryDropdown)
        .when(isPhoneNumber, wrapPhoneNumberInput)
        .otherwise(wrapAddressTextField),
    ),
    gridContainerWrapper,
  )

const renderShippingAddressFields = () =>
  pipe(
    shippingAddressFields,
    renderAddressFields,
    panelWrapper("Shipping Address"),
  )

const getPayerField = ({ name, label }: { name: string; label: string }) => ({
  name: convertToPayerField(name),
  label,
})

const renderPaymentAddressFields = () =>
  pipe(
    shippingAddressFields,
    Amap(getPayerField),
    renderAddressFields,
    panelWrapper("Payment Address"),
  )

export {
  isCountry,
  renderStrainTotal,
  renderPlasmidTotal,
  renderStrainAndPlasmidTotals,
  renderCartTotal,
  renderAddressFields,
  renderShippingAddressFields,
  renderPaymentAddressFields,
}
