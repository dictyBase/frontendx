import type { FC } from "react"
import Paper from "@mui/material/Paper"
import { pipe } from "fp-ts/function"
import { useNavigate } from "react-router-dom"
import { match as Omatch } from "fp-ts/Option"
import { CatalogListItemHeader } from "./CatalogListItemHeader"
import { CatalogListItemBody } from "./CatalogListItemBody"
import { CatalogListItemMatchFooter } from "./CatalogListItemMatchFooter"
import { toEntityPath, CatalogListItemData } from "./catalogListItemData"
import { getEntityPresentation } from "./catalogEntityPresentation"
import type { CatalogItem } from "../types"

type CatalogListItemProperties = {
  /** The view model to render, built by `fromStockSearchResult` or `fromCatalogItem`. */
  data: CatalogListItemData
  /**
   * Component rendered in the header's action slot.
   * Receives the item converted to a `CatalogItem`.
   * Typically `AddToCartButtonHandler`.
   */
  actionComponent: FC<{ item: CatalogItem }>
}

/**
 * Renders a single catalog entry as a card: an entity-tinted header with
 * availability and an action button, a body with the title, summary, and a
 * faded entity watermark, and, for search results, a footer describing the
 * matched field and relevance score.
 *
 * @param data - The view model to render, built by `fromStockSearchResult` or `fromCatalogItem`.
 * @param actionComponent - Component for the header's action slot (e.g. add-to-cart button).
 */
const CatalogListItem = ({
  data,
  actionComponent: ActionComponent,
}: CatalogListItemProperties) => {
  const { id, entity, title, summary, inStock, item, match } = data
  const navigate = useNavigate()
  const { itemBorder } = getEntityPresentation(entity)
  const path = toEntityPath(entity)

  return (
    <Paper
      onClick={() => navigate(`/${path}/${id}`)}
      variant="outlined"
      sx={{
        overflow: "hidden",
        "&:hover": {
          cursor: "pointer",
          borderColor: itemBorder,
          borderStyle: "solid",
          borderWidth: 2,
        },
      }}>
      <CatalogListItemHeader
        entity={entity}
        title={title}
        id={id}
        inStock={inStock}
        action={<ActionComponent item={item} />}
      />
      <CatalogListItemBody summary={summary} />
      {pipe(
        match,
        Omatch(
          () => <></>,
          (m) => <CatalogListItemMatchFooter match={m} />,
        ),
      )}
    </Paper>
  )
}

export { CatalogListItem }
export type { CatalogListItemProperties }
