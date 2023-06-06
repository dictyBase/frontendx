import { Box } from "@material-ui/core"
import { pipe } from "fp-ts/lib/function"
import { map as Omap, getOrElse } from "fp-ts/Option"
import { fromChildren, composeChildren, type Comp } from "@dictybase/functional"
import { FooterHead } from "../components/FooterHead"
import { FooterSponsors } from "../components/FooterSponsors"
import { FooterContainer } from "../components/FooterContainer"
import { Links } from "./Links"
import { footerData } from "../data/footerData"

const footerContainerWrapper = (children: Comp) => (
  <FooterContainer>{children}</FooterContainer>
)

export const Footer = () =>
  pipe(
    [
      <FooterHead title="Dicty Community Resource" />,
      <Links data={footerData} />,
      <FooterSponsors />,
    ],
    fromChildren,
    composeChildren,
    Omap(footerContainerWrapper),
    getOrElse(() => <Box>error in rendering</Box>),
  )
