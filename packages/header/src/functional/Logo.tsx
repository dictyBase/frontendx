import { default as ReactCompose } from "./reactfp"
import { pipe } from "fp-ts/function"
import { Option, match } from "fp-ts/Option"
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
    match(
      () => "Dicty Community Resource",
      (value) => value,
    ),
  )
  return pipe(
    Array.of(<ImgContainer />, <TitleContainer title={logoTitle} />),
    ReactCompose,
    LogoContainer,
  )
}
export default Logo
