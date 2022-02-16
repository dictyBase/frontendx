import { Theme } from "@material-ui/core"

export interface FooterProps {
  title: string
  links: Array<FooterItem>
  theme?: Partial<Theme>
}

export interface FooterContainerProps {
  title: string
  links: Array<FooterItem>
}

export interface FooterLinksProps {
  links: Array<FooterItem>
}

export interface FooterItem {
  url: string
  description: string
}

export interface FooterHeadProps {
  title: string
}
