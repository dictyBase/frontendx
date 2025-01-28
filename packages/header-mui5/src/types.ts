import { type SvgIconTypeMap } from "@mui/material"
import { type OverridableComponent } from "@mui/material/OverridableComponent"

type IconType = OverridableComponent<SvgIconTypeMap<{}, "svg">>

type IconItemProperty = {
  href: string
  title: string
  key: string
  Icon: IconType
}

export type { IconItemProperty, IconType }
