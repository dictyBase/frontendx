import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import { v4 as uuid4 } from "uuid"
import { match } from "ts-pattern"
import { map } from "fp-ts/Array"
import { pipe } from "fp-ts/function"
import {
  type UseFormRegister,
  type FieldValues,
  type FieldErrors,
  type Path,
} from "react-hook-form"
import { CartTotalRow } from "./cart/CartTotalRow"
import { type Cart } from "./types"
import { getCartTotal } from "./utils/getCartTotal"
import { addressFields } from "./order/addressFields"
import { CountryDropdown } from "./order/CountryDropdown"
import { PanelWrapper } from "./order/PanelWrapper"
import { StyledGridContainer } from "./order/StyledGridContainer"

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

const matchCountry =
  <F extends FieldValues>(
    register: UseFormRegister<F>,
    errors: FieldErrors<F>,
  ) =>
  (addressField: AddressField) =>
    match(addressField)
      .when(
        ({ name }) => name === "country",
        () => <CountryDropdown />,
      )
      .otherwise(({ name, label }) => (
        <TextField
          label={label}
          fullWidth
          margin="dense"
          variant="outlined"
          // TODO: fix typing so we don't have to make the assumption the property "name" satisfies Path<F>
          {...register(name as Path<F>)}
          error={!!errors[name]}
          helperText={errors[name]?.message || ""}
        />
      ))

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

const renderAddressFields = <F extends FieldValues>(
  register: UseFormRegister<F>,
  errors: FieldErrors<F>,
) => {
  const matchCountryFunction = matchCountry(register, errors)
  return pipe(
    addressFields,
    map(matchCountryFunction),
    map(gridItemWrapper),
    gridContainerWrapper,
    panelWrapper("Shipping Address"),
  )
}

export {
  renderStrainTotal,
  renderPlasmidTotal,
  renderStrainAndPlasmidTotals,
  renderCartTotal,
  renderAddressFields,
}
