import { fromChildren, composeChildren } from "@dictybase/functional"
import { Box } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { Option, getOrElse, map as Omap, none } from "fp-ts/Option"
import {
  ImgContainer,
  TitleContainer,
  LogoContainer,
} from "../components/LogoContainer"

interface LogoProperties {
  title?: Option<string>
  frontPageUrl: string
}

const Logo = ({ title = none, frontPageUrl }: LogoProperties) => {
  const logoTitle = pipe(
    title,
    getOrElse(() => "Dicty Community Resource"),
  )
  return pipe(
    [<ImgContainer key={1} />, <TitleContainer key={2} title={logoTitle} />],
    fromChildren,
    composeChildren,
    Omap((children) => (
      <LogoContainer frontPageUrl={frontPageUrl}>{children}</LogoContainer>
    )),
    getOrElse(() => <Box>error in rendering</Box>),
  )
}
export { Logo }
