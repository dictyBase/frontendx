import { pipe, flow } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { map as Omap, getOrElse } from "fp-ts/Option"
import { fromChildren, composeChildren, Comp } from "@dictybase/functional"
import { fork } from "fp-ts-std/Function"
import {
  type IconItemProp,
  iconItems,
  Title,
  LinksIcon,
  LinksIconButton,
  LinksContainer,
} from "../components/LinksContainer"

type iconButtonPipeProperties = JSX.Element | string | undefined

const mapTitle = ({ title }: IconItemProp) => ({ title })
const mapIcon = ({ Icon }: IconItemProp) => ({ Icon })
const mapHref = ({ href }: IconItemProp) => href
const titlePipe = flow(Amap(mapTitle), Amap(Title))
const iconPipe = flow(Amap(mapIcon), Amap(LinksIcon))
const linksContainerWrapper = (children: Comp) => (
  <LinksContainer children={children} />
)
const iconButtonPipe = ([
  first,
  second,
  href,
]: Array<iconButtonPipeProperties>) =>
  pipe(
    [first, second],
    fromChildren,
    composeChildren,
    Omap((children) => (
      <LinksIconButton href={href as string} children={children} />
    )),
    getOrElse(() => <></>),
  )

const Links = () =>
  pipe(
    iconItems,
    fork([titlePipe, iconPipe, flow(Amap(mapHref))]),
    Amap(iconButtonPipe),
    fromChildren,
    composeChildren,
    Omap(linksContainerWrapper),
    getOrElse(() => <></>),
  )

export default Links
