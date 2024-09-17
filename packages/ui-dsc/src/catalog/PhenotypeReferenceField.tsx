/* eslint-disable dot-notation */
import { TextField, IconButton } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { useFormContext } from "react-hook-form"

type PhenotypeReferenceFieldProperties = {
  onClick: () => void
}
const PhenotypeReferenceField = ({
  onClick,
}: PhenotypeReferenceFieldProperties) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <TextField
        {...register("publication")}
        label="Reference"
        size="small"
        variant="outlined"
        error={!!errors["publication"]}
        helperText={errors["publication"]?.message || ""}
      />
      <IconButton onClick={onClick}>
        <SearchIcon />
      </IconButton>
    </>
  )
}

export { PhenotypeReferenceField }
