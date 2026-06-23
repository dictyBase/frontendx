import type { ReactNode } from "react"
import type { SxProps, Theme } from "@mui/material"

type LinkItem = {
  label: string
  href: string
  external?: boolean
}

type NavigationItem = {
  label: string
  href: string
}

type CatalogCardProperties = {
  icon: string
  title: string
  description: string
  href: string
  external?: boolean
  linkText?: string
  sx?: SxProps<Theme>
}

type StatCardProperties = {
  number: string
  label: string
  gradient?: [string, string]
  sx?: SxProps<Theme>
}

type InfoCardProperties = {
  title: string
  icon?: string
  links: LinkItem[]
  sx?: SxProps<Theme>
}

type HeroProperties = {
  title: string
  sx?: SxProps<Theme>
}

type PageContainerProperties = {
  children: ReactNode
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
  sx?: SxProps<Theme>
}

type GridLayoutProperties = {
  children: ReactNode
  minColumnWidth: string
  gap?: number
  sx?: SxProps<Theme>
}

type SectionTitleProperties = {
  children: ReactNode
  id?: string
  sx?: SxProps<Theme>
}

type ArrowLinkProperties = {
  href: string
  children: ReactNode
  external?: boolean
  sx?: SxProps<Theme>
}

type WarningBannerProperties = {
  children: ReactNode
  sx?: SxProps<Theme>
}

type HeaderProperties = {
  navigation: NavigationItem[]
  logoHref?: string
  sx?: SxProps<Theme>
}

type FooterProperties = {
  title: string
  subtitle?: string
  sx?: SxProps<Theme>
}

export type {
  LinkItem,
  NavigationItem,
  CatalogCardProperties,
  StatCardProperties,
  InfoCardProperties,
  HeroProperties,
  PageContainerProperties,
  GridLayoutProperties,
  SectionTitleProperties,
  ArrowLinkProperties,
  WarningBannerProperties,
  HeaderProperties,
  FooterProperties,
}
