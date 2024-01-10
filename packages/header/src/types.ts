import { type SvgIconTypeMap } from "@material-ui/core"
import { type OverridableComponent } from "@material-ui/core/OverridableComponent"

type IconType = OverridableComponent<SvgIconTypeMap<{}, "svg">>

type IconItemProperty = {
  href: string
  title: string
  key: string
  Icon: IconType
}

export type { IconItemProperty, IconType }
