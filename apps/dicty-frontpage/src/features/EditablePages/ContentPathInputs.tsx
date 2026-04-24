import { TextField, Stack } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { MonoidAny } from "fp-ts/boolean"
import { SectionSelect } from "./SectionSelect"

const ContentPathInputs = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const sectionValue = watch("section")
  const nameValue = watch("name")
  const subnameDisabled = MonoidAny.concat(
    SisEmpty(sectionValue),
    SisEmpty(nameValue),
  )
  return (
    <>
      <SectionSelect />
      <TextField
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        label="* Name"
        name="name"
        variant="outlined"
      />
      <TextField
        {...register("subname")}
        error={!!errors.subname}
        label="Subname"
        name="subname"
        variant="outlined"
        disabled={subnameDisabled}
      />
    </>
  )
}

export { ContentPathInputs }
