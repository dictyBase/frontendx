import {
  fromChildren,
  composeChildren,
} from "@dictybase/functional"
import { pipe } from "fp-ts/function"
import { Option, getOrElse, map as Omap } from "fp-ts/Option"
import {
  ImgContainer,
  TitleContainer,
  LogoContainer,
} from "../components/LogoContainer"

interface LogoProperties {
  title: Option<string>
}

const Logo = ({ title }: LogoProperties) => {
  const logoTitle = pipe(
    title,
    getOrElse(() => "Dicty Community Resource"),
  )
  return pipe(
    [<ImgContainer />, <TitleContainer title={logoTitle} />],
    fromChildren,
    composeChildren,
    Omap((children) => <LogoContainer children={children} />),
    getOrElse(() => <></>),
  )
}
export default Logo
