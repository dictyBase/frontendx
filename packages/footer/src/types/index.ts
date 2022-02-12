import { Theme } from "@material-ui/core"

export interface FooterProps {
  links: Array<FooterItem>
  theme?: Partial<Theme>
}

export interface FooterContainerProps {
  links: Array<FooterItem>
}

export interface FooterLinksProps {
  links: Array<FooterItem>
}

export interface FooterItem {
  url: string
  description: string
}
