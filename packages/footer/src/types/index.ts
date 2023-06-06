import { Theme } from "@material-ui/core"
import { Comp } from "@dictybase/functional"
import React from "react"

export interface FooterProperties {
  title: string
  links: React.ReactNode
  theme?: Partial<Theme>
}

export interface FooterContainerProperties {
  children: Comp
}

export interface FooterLinksProperties {
  links: React.ReactNode
}

export interface FooterItem {
  url: string
  label: string
}

export interface FooterHeadProperties {
  title: string
}
