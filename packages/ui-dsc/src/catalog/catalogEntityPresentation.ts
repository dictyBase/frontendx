import { match } from "ts-pattern"
import { StrainIcon, PlasmidIcon } from "./CatalogEntityIcons"
import type { CatalogEntityType } from "./catalogListItemData"
import {
  STRAIN_BADGE_COLOR,
  STRAIN_BADGE_BG,
  STRAIN_BADGE_BORDER,
  STRAIN_ITEM_BORDER,
  PLASMID_BADGE_COLOR,
  PLASMID_BADGE_BG,
  PLASMID_BADGE_BORDER,
  PLASMID_ITEM_BORDER,
} from "./constants"

/**
 * The accent colour, background tint, border colour, icon, and display
 * label used to present a {@link CatalogEntityType} throughout a
 * {@link CatalogListItem} (header tint, card border, entity label, and
 * watermark).
 */
type CatalogEntityPresentation = {
  /** Accent colour for the entity's icon and label.. */
  color: string
  /** Light background tint for the badge background. */
  bg: string
  /** Border colour for badge card. */
  border: string
  /** Border colour for the item card. */
  itemBorder: string
  /** Icon component representing the entity. */
  Icon: typeof StrainIcon
  /** Display label, e.g. `"Strain"`. */
  label: string
}

/**
 * Returns the colours, icon, and label used to present a catalog entity
 * type. Reuses the same accent colours as `SearchResultsTable`'s entity
 * badges, so strains and plasmids are coloured consistently across both
 * the table and card presentations.
 *
 * @param entity - The catalog entity type.
 * @returns The entity's colour, background tint, border, icon, and label.
 */
const getEntityPresentation = (
  entity: CatalogEntityType,
): CatalogEntityPresentation =>
  match(entity)
    .with("Strain", () => ({
      color: STRAIN_BADGE_COLOR,
      bg: STRAIN_BADGE_BG,
      border: STRAIN_BADGE_BORDER,
      itemBorder: STRAIN_ITEM_BORDER,
      Icon: StrainIcon,
      label: "Strain",
    }))
    .with("Plasmid", () => ({
      color: PLASMID_BADGE_COLOR,
      bg: PLASMID_BADGE_BG,
      border: PLASMID_BADGE_BORDER,
      itemBorder: PLASMID_ITEM_BORDER,
      Icon: PlasmidIcon,
      label: "Plasmid",
    }))
    .exhaustive()

export { getEntityPresentation }
export type { CatalogEntityPresentation }
