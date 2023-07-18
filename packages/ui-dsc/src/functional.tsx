import Grid from "@material-ui/core/Grid"
import { v4 as uuid4 } from "uuid"
import { map, flatten, partition } from "fp-ts/Array"
import { left, right } from "fp-ts/Separated"
import { pipe } from "fp-ts/function"
import { CartTotalRow } from "./cart/CartTotalRow"
import { type Cart } from "./types"
import { getCartTotal } from "./utils/getCartTotal"
import { shippingAddressFields } from "./order/addressFields"
import { CountryDropdown } from "./order/CountryDropdown"
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

const renderPlasmidTotal = ({ plasmidItems }: Cart) => (
  <CartTotalRow
    leftValue="Plasmids"
    numItems={plasmidItems.length}
    total={getCartTotal(plasmidItems)}
    variant="body2"
  />
)

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

const renderCartTotal = ({ strainItems = [], plasmidItems = [] }: Cart) => {
  const cumulative = [...strainItems, plasmidItems]
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

const gridItemWrapper = (element: JSX.Element) => (
  <Grid key={uuid4()} item>
    {element}
  </Grid>
)

const gridContainerWrapper = (elements: Array<JSX.Element>) => (
  <StyledGridContainer>{elements}</StyledGridContainer>
)

// eslint-disable-next-line react/function-component-definition
const panelWrapper = (title: string) => (element: JSX.Element) =>
  <PanelWrapper title={title}>{element}</PanelWrapper>

const isCountry = ({ name }: { name: string }) => name === "country"

const wrapAddressTextField = ({ name, label }: AddressField) => (
  <TextField name={name} label={label} />
)

const wrapCountryDropdown = () => <CountryDropdown />

const renderAddressFields = (addressFields: Array<AddressField>) => {
  const textFields = pipe(
    addressFields,
    partition(isCountry),
    left,
    map(wrapAddressTextField),
  )
  const countryField = pipe(
    addressFields,
    partition(isCountry),
    right,
    map(wrapCountryDropdown),
  )
  return pipe(
    [textFields, countryField],
    flatten,
    map(gridItemWrapper),
    gridContainerWrapper,
  )
}

const renderShippingAddressFields = () =>
  pipe(
    shippingAddressFields,
    renderAddressFields,
    panelWrapper("Shipping Address"),
  )

const capitalizeFirstLetter = (string: string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`

const appendPayer = (string: string) => `payer${string}`

const convertAddressFieldName = (name: string) =>
  pipe(name, capitalizeFirstLetter, appendPayer)

const getPayerField = ({ name, label }: { name: string; label: string }) => ({
  name: convertAddressFieldName(name),
  label,
})

const renderPaymentAddressFields = () =>
  pipe(
    shippingAddressFields,
    map(getPayerField),
    renderAddressFields,
    panelWrapper("Payment Address"),
  )

export {
  renderStrainTotal,
  renderPlasmidTotal,
  renderStrainAndPlasmidTotals,
  renderCartTotal,
  renderShippingAddressFields,
  renderPaymentAddressFields,
}
