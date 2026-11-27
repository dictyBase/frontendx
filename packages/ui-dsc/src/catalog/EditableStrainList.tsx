import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty, Eq as SEq } from "fp-ts/string"
import { map as Amap, filter as Afilter, elem as Aelem } from "fp-ts/Array"
import { left as TEleft } from "fp-ts/TaskEither"
import Stack from "@mui/material/Stack"
import {
  StrainUpdateErrorType,
  useAuthorizedUpdateStrain,
} from "./useAuthorizedUpdateStrain"
import { MorphingButton } from "./MorphingButton"
import { DeletableChip } from "./DeletableChip"

type StrainListEditableField =
  | "names"
  | "characteristics"
  | "genes"
  | "publications"

type EditableStrainListProperties = {
  /** Strain ID */
  id: string
  /** Array field key in UpdateStrainInput */
  field: StrainListEditableField
  /** Current array of string items */
  infoList: Array<string>
  /** Optional function returning a link href for each chip item */
  getItemHref?: (item: string) => string
}

/**
 * Renders a list of strain values as deletable chips alongside a morphing add button.
 *
 * @param properties - Strain ID, field name, item list, and optional link builder.
 * @returns The rendered EditableStrainList component.
 */
const EditableStrainList = ({
  id,
  field,
  infoList,
  getItemHref,
}: EditableStrainListProperties) => {
  const update = useAuthorizedUpdateStrain()

  const handleAdd = (value: string) => {
    if (SisEmpty(value)) {
      return TEleft({
        errorType: StrainUpdateErrorType.VALIDATION,
        message: "Value cannot be empty",
      })
    }

    if (pipe(infoList, Aelem(SEq)(value))) {
      return TEleft({
        errorType: StrainUpdateErrorType.VALIDATION,
        message: "Value already exists",
      })
    }

    return update(id, { [field]: [...infoList, value] })
  }

  const handleDelete = (value: string) =>
    pipe(
      infoList,
      Afilter((item) => item !== value),
      (filteredList) => update(id, { [field]: filteredList }),
    )

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      spacing={1}
      rowGap={1}>
      {pipe(
        infoList,
        Amap((item) => (
          <DeletableChip
            key={item}
            label={item}
            href={getItemHref?.(item)}
            handleDelete={handleDelete}
          />
        )),
      )}
      <MorphingButton onAdd={handleAdd} />
    </Stack>
  )
}

export {
  EditableStrainList,
  type EditableStrainListProperties,
  type StrainListEditableField,
}
