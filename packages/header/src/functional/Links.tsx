import { Box } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { v4 as uuid4 } from "uuid"
import { map as Amap, let as Alet, bindTo } from "fp-ts/Array"
import { map as Omap, getOrElse, Option } from "fp-ts/Option"
import { fromChildren, composeChildren, Comp } from "@dictybase/functional"
import {
  type IconItemProperty,
  iconItems,
  Title,
  LinksIcon,
  LinksIconButton,
  LinksContainer,
} from "../components/LinksContainer"

type composeTitleIconProperties = {
  items: IconItemProperty
  titleComp: Comp
  iconComp: Comp
}
type linksIconButtonWrapperProperties = composeTitleIconProperties & {
  children: Option<Comp>
}

const linksContainerWrapper = (children: Comp) => (
  <LinksContainer>{children}</LinksContainer>
)

const linksIconButtonWrapper = ({
  children,
  items: { href },
}: linksIconButtonWrapperProperties) =>
  pipe(
    children,
    Omap((comp) => (
      <LinksIconButton href={href} key={uuid4()}>
        {comp}
      </LinksIconButton>
    )),
    getOrElse(() => <Box>Error in rendering</Box>),
  )

const composeTitleIcon = ({
  titleComp,
  iconComp,
}: composeTitleIconProperties) =>
  pipe([titleComp, iconComp], fromChildren, composeChildren)

const iconButtonPipe = (items: Array<IconItemProperty>) =>
  pipe(
    items,
    bindTo("items"),
    Alet("titleComp", ({ items: { title } }) => (
      <Title title={title} key={uuid4()} />
    )),
    Alet("iconComp", ({ items: { Icon } }) => (
      <LinksIcon Icon={Icon} key={uuid4()} />
    )),
    Alet("children", composeTitleIcon),
    Amap(linksIconButtonWrapper),
  )

const Links = () =>
  pipe(
    iconButtonPipe(iconItems),
    fromChildren,
    composeChildren,
    Omap(linksContainerWrapper),
    getOrElse(() => <Box>error in rendering</Box>),
  )

export default Links
