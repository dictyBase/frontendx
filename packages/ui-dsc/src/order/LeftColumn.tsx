import { useCallback } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import { match } from "ts-pattern"
import { map } from "fp-ts/Array"
import { pipe } from "fp-ts/function"
import { useFormContext, type UseFormRegister, type FieldValues, type FieldErrors } from "react-hook-form"
import { addressFields } from "./addressFields"

type AddressField = {
    name: string
    label: string
}

const matchCountry = (register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>) => (addressField: AddressField) => {
    return match(addressField).when(({ name }) => name === "country", () => <p>CountryField not implemented.</p>).otherwise((addressField) => {
        const { name, label  } = addressField
        return <TextField label={label} {...register(name)} error={!!errors[name]} helperText={errors[name]?.type || ""}/>
    })  
}

const gridItemWrapper = (element: JSX.Element) => <Grid item>{element}</Grid>

const LeftColumn = () => {
    const { register, formState: { errors } } = useFormContext()
    const matchCountryFunction = useCallback(matchCountry(register, errors), [register, errors])
    
    return <Grid container spacing={1}>
        {pipe(addressFields, map(matchCountryFunction), map(gridItemWrapper))}    
    </Grid>
}

export { LeftColumn }