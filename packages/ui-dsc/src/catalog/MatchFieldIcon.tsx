import type { SvgIconProps } from "@mui/material/SvgIcon"
import Tag from "@mui/icons-material/Tag"
import Science from "@mui/icons-material/Science"
import Thermostat from "@mui/icons-material/Thermostat"
import Biotech from "@mui/icons-material/Biotech"
import Visibility from "@mui/icons-material/Visibility"
import Category from "@mui/icons-material/Category"
import Person from "@mui/icons-material/Person"
import LinkIcon from "@mui/icons-material/Link"
import MenuBook from "@mui/icons-material/MenuBook"
import Notes from "@mui/icons-material/Notes"
import { match, P } from "ts-pattern"
import { StockSearchFieldEnum } from "dicty-graphql-schema"
import { PlasmidIcon } from "./CatalogEntityIcons"

type MatchFieldIconProperties = SvgIconProps & {
  /** The stock field a search match was found in. */
  field: StockSearchFieldEnum
}

/**
 * Maps a `StockSearchFieldEnum` value to the icon representing it in a
 * {@link CatalogListItem}'s match footer.
 *
 * @param field - The `StockSearchFieldEnum` value to map.
 * @returns The icon component for the field.
 */
const iconForField = (field: StockSearchFieldEnum) =>
  match(field)
    .with(
      P.union(
        StockSearchFieldEnum.Label,
        StockSearchFieldEnum.Name,
        StockSearchFieldEnum.Names,
        StockSearchFieldEnum.Synonym,
        StockSearchFieldEnum.SystematicName,
        StockSearchFieldEnum.StockId,
      ),
      () => Tag,
    )
    .with(StockSearchFieldEnum.Assay, () => Science)
    .with(StockSearchFieldEnum.Environment, () => Thermostat)
    .with(
      P.union(
        StockSearchFieldEnum.Genes,
        StockSearchFieldEnum.Genotype,
        StockSearchFieldEnum.GeneticModification,
        StockSearchFieldEnum.MutagenesisMethod,
      ),
      () => Biotech,
    )
    .with(
      P.union(
        StockSearchFieldEnum.Phenotype,
        StockSearchFieldEnum.Characteristic,
      ),
      () => Visibility,
    )
    .with(StockSearchFieldEnum.Plasmid, () => PlasmidIcon)
    .with(StockSearchFieldEnum.Species, () => Category)
    .with(StockSearchFieldEnum.Depositor, () => Person)
    .with(StockSearchFieldEnum.Dbxrefs, () => LinkIcon)
    .with(
      P.union(
        StockSearchFieldEnum.TermLabel,
        StockSearchFieldEnum.TermDefinition,
        StockSearchFieldEnum.TermComment,
        StockSearchFieldEnum.TermSynonym,
      ),
      () => MenuBook,
    )
    .with(
      P.union(StockSearchFieldEnum.Summary, StockSearchFieldEnum.PublicNote),
      () => Notes,
    )
    .exhaustive()

/**
 * Renders the icon representing which stock field a search match was found
 * in, inside the match footer of a {@link CatalogListItem}.
 *
 * @param field - The `StockSearchFieldEnum` value to render an icon for.
 * @param properties - Standard `SvgIconProps`, forwarded to the chosen icon.
 */
const MatchFieldIcon = ({ field, ...properties }: MatchFieldIconProperties) => {
  const Icon = iconForField(field)
  return <Icon aria-hidden {...properties} />
}

export { MatchFieldIcon }
export type { MatchFieldIconProperties }
