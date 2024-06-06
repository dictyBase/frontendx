import { Box } from "@material-ui/core"
import { pipe } from "fp-ts/lib/function"
import { map as Omap, getOrElse } from "fp-ts/Option"
import { fromChildren, composeChildren, type Comp } from "@dictybase/functional"
import { v4 as uuid4 } from "uuid"
import { FooterHead } from "../components/FooterHead"
import { FooterSponsors } from "../components/FooterSponsors"
import { FooterContainer } from "../components/FooterContainer"
import { Links } from "./Links"
import { FooterItem } from "../types"

type FooterProperties = {
  data: Array<FooterItem>
}

const footerContainerWrapper = (children: Comp) => (
  <FooterContainer>{children}</FooterContainer>
)

export const Footer = ({ data }: FooterProperties) =>
  pipe(
    [
      <FooterHead key={uuid4()} title="Dicty Community Resource" />,
      <Links key={uuid4()} data={data} />,
      <FooterSponsors key={uuid4()} />,
    ],
    fromChildren,
    composeChildren,
    Omap(footerContainerWrapper),
    getOrElse(() => <Box>error in rendering</Box>),
  )
