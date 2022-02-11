import { Theme } from "@material-ui/core"

export interface FooterProps {
  links: Array<any>
  theme?: Partial<Theme>
}

export interface FooterContainerProps {
  links: Array<any>
}