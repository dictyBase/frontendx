import { Theme } from "@material-ui/core"
import React from "react"

export interface FooterProps {
  title: string
  children: React.ReactNode
  theme?: Partial<Theme>
}

export interface FooterContainerProps {
  title: string
  links: React.ReactNode
}

export interface FooterLinksProps {
  links: React.ReactNode
}

export interface FooterItem {
  url: string
  label: string
}

export interface FooterHeadProps {
  title: string
}
