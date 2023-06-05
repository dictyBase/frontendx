import { Theme } from "@material-ui/core"
import React from "react"

export interface FooterProperties {
  title: string
  children: React.ReactNode
  theme?: Partial<Theme>
}

export interface FooterContainerProperties {
  title: string
  links: React.ReactNode
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
