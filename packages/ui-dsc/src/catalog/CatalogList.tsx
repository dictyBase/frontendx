import type { FC } from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { CatalogListItem } from "./CatalogListItem"
import type { CatalogListItemData } from "./catalogListItemData"
import type { CatalogItem } from "../types"

type CatalogListComponentProperties = {
  /** The view models to render, one `CatalogListItem` per entry. */
  items: Array<CatalogListItemData>
  /**
   * Component rendered in each item's action slot.
   * Typically `AddToCartButtonHandler`.
   */
  actionComponent: FC<{ item: CatalogItem }>
}

/**
 * Renders a scrollable, vertically stacked list of catalog entries, each as
 * a {@link CatalogListItem} card.
 *
 * @param items - The view models to render.
 * @param actionComponent - Component for each item's action slot (e.g. add-to-cart button).
 */
const CatalogList = ({
  items,
  actionComponent,
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
    </Stack>
  </Box>
)

export { CatalogList }
export type { CatalogListComponentProperties }
