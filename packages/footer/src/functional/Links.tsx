import { Box } from "@material-ui/core"
import { pipe } from "fp-ts/lib/function"
import { map as Amap } from "fp-ts/Array"
import { map as Omap, getOrElse } from "fp-ts/Option"
import { Comp, fromChildren, composeChildren } from "@dictybase/functional"
import { FooterLink } from "../components/FooterLink"
import { type FooterItem } from "../types"
import { FooterLinks } from "../components/FooterLinks"

type LinksProperties = {
  data: FooterItem[]
}

const footerLinksWrapper = (children: Comp) => <FooterLinks links={children} />

export const Links = ({ data }: LinksProperties) =>
  pipe(
    data,
    Amap(FooterLink),
    fromChildren,
    composeChildren,
    Omap(footerLinksWrapper),
    getOrElse(() => <Box>error in rendering</Box>),
  )
