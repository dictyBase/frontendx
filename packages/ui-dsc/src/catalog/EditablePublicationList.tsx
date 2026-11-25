import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty, Eq as SEq } from "fp-ts/string"
import { map as Amap, filter as Afilter, elem as Aelem } from "fp-ts/Array"
import { left as TEleft } from "fp-ts/TaskEither"
import Stack from "@mui/material/Stack"
import { Publication } from "dicty-graphql-schema"
import {
  StrainUpdateErrorType,
  useAuthorizedUpdateStrain,
} from "./useAuthorizedUpdateStrain"
import { PublicationDisplay } from "./PublicationDisplay"
import { DeletableChip } from "./DeletableChip"
import { MorphingButton } from "./MorphingButton"

type PublicationItem = Pick<
  Publication,
  | "id"
  | "pub_date"
  | "journal"
  | "title"
  | "authors"
  | "volume"
  | "pages"
  | "doi"
>

type EditablePublicationListProperties = {
  /** Strain ID */
  id: string
  /** List of publication references associated with the strain */
  publications: Array<PublicationItem>
}

/**
 * Renders a list of strain reference publications with per-item deletion and an add control.
 *
 * @param properties - Strain ID and publications array.
 * @returns The rendered EditablePublicationList component.
 */
const EditablePublicationList = ({
  id,
  publications,
}: EditablePublicationListProperties) => {
  const update = useAuthorizedUpdateStrain()
  const publicationIds = pipe(
    publications,
    Amap((publication) => publication.id),
  )

  const handleAdd = (value: string) => {
    if (SisEmpty(value)) {
      return TEleft({
        errorType: StrainUpdateErrorType.VALIDATION,
        message: "Value cannot be empty",
      })
    }

    if (pipe(publicationIds, Aelem(SEq)(value))) {
      return TEleft({
        errorType: StrainUpdateErrorType.VALIDATION,
        message: "Value already exists",
      })
    }

    return update(id, { publications: [...publicationIds, value] })
  }

  const handleDelete = (value: string) =>
    pipe(
      publicationIds,
      Afilter((publicationId) => publicationId !== value),
      (filteredIds) => update(id, { publications: filteredIds }),
    )

  return (
    <Stack direction="column" spacing={1}>
      {pipe(
        publications,
        Amap((publication) => (
          <Stack
            key={publication.id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            spacing={1}
            rowGap={1}>
            <PublicationDisplay publication={publication} />
            <DeletableChip label={publication.id} handleDelete={handleDelete} />
          </Stack>
        )),
      )}
      <Stack direction="row" alignItems="center">
        <MorphingButton onAdd={handleAdd} />
      </Stack>
    </Stack>
  )
}

export {
  EditablePublicationList,
  type EditablePublicationListProperties,
  type PublicationItem,
}
