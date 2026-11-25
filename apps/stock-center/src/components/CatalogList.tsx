import type { FC, RefObject } from "react"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import Stack from "@mui/material/Stack"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap } from "fp-ts/Array"
import { Eq as NEq } from "fp-ts/number"
import { CatalogListItem, CatalogListItemData } from "@dictybase/ui-dsc"
import type { CatalogItem } from "../types"

type CatalogListComponentProperties = {
  /** The view models to render, one `CatalogListItem` per entry. */
  items: Array<CatalogListItemData>
  /**
   * Component rendered in each item's action slot.
   * Typically `AddToCartButtonHandler`.
   */
  actionComponent: FC<{ item: CatalogItem }>
  /** Ref attached to the progress indicator at the bottom for infinite scroll. */
  loadMoreRef?: RefObject<HTMLDivElement | null>
  /** Cursor for the next page of results; `0` when no more pages exist. */
  nextCursor?: number
}

/**
 * Renders a scrollable, vertically stacked list of catalog entries, each as
 * a {@link CatalogListItem} card.
 *
 * @param items - The view models to render.
 * @param actionComponent - Component for each item's action slot (e.g. add-to-cart button).
 * @param loadMoreRef - Ref attached to the progress indicator for infinite scroll.
 * @param nextCursor - Cursor for the next page of results.
 */
const CatalogList = ({
  items,
  actionComponent,
  loadMoreRef,
  nextCursor = 0,
}: CatalogListComponentProperties) => (
  <Box sx={{ maxHeight: "700px", overflowY: "auto" }}>
    <Stack gap={2}>
      {pipe(
        items,
        Amap((data) => (
          <CatalogListItem
            key={data.id}
            data={data}
            actionComponent={actionComponent}
          />
        )),
      )}
      {pipe(
        NEq.equals(nextCursor, 0),
        Bmatch(
          () => (
            <Box ref={loadMoreRef} sx={{ py: 1 }}>
              <LinearProgress />
            </Box>
          ),
          () => <></>,
        ),
      )}
    </Stack>
  </Box>
)

export { CatalogList }
export type { CatalogListComponentProperties }
