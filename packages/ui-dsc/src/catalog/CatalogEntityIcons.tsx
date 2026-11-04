import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon"

/**
 * Decorative icon representing a strain: a cell membrane with a nucleus.
 * Used both as the small header glyph and the large faded watermark on a
 * {@link CatalogListItem}.
 *
 * @param properties - Standard `SvgIconProps`, forwarded to the underlying `SvgIcon`.
 */
const StrainIcon = (properties: SvgIconProps) => (
  <SvgIcon {...properties} viewBox="0 0 24 24">
    <circle
      cx={12}
      cy={12}
      r={9}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <circle cx={12} cy={12} r={4} fill="currentColor" />
    <circle cx={7} cy={8} r={1.1} fill="currentColor" />
    <circle cx={16.5} cy={8.5} r={1} fill="currentColor" />
    <circle cx={15.5} cy={16.5} r={1.1} fill="currentColor" />
  </SvgIcon>
)

/**
 * Decorative icon representing a plasmid: a dashed circular DNA ring.
 * Used both as the small header glyph and the large faded watermark on a
 * {@link CatalogListItem}.
 *
 * @param properties - Standard `SvgIconProps`, forwarded to the underlying `SvgIcon`.
 */
const PlasmidIcon = (properties: SvgIconProps) => (
  <SvgIcon {...properties} viewBox="0 0 24 24">
    <circle
      cx={12}
      cy={12}
      r={9}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeDasharray="2.2 3.1"
    />
    <circle cx={12} cy={12} r={2.4} fill="currentColor" />
  </SvgIcon>
)

export { StrainIcon, PlasmidIcon }
