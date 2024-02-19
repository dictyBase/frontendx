import { Box } from "@material-ui/core"
import { fromChildren, composeChildren, type Comp } from "@dictybase/functional"
import { pipe } from "fp-ts/function"
import { map as Omap, getOrElse } from "fp-ts/Option"
import { headerStyles } from "../styles/headerStyles"
import { Logo } from "./Logo"
import { Links } from "./Links"
import { Search } from "./Search"

type HeaderProperties = { links: Array<Comp> }

const boxWrapper = (children: Comp) => (
  <Box className={headerStyles().header}>{children}</Box>
)

/**
 * Renders a header component with a logo, search bar and navigation links.
 * @returns The rendered header component.
 * @example
 * ```
 * import {Header} from "@dictybase/header"
 *
 * const App = () => (
 *   <div>
 *     <Header />
 *     <p>This is the main content area</p>
 *   </div>
 * )
 * ```
 */
const Header = ({ links }: HeaderProperties) =>
  pipe(
    // An array of JSX components
    [<Logo key={1} />, <Search key={2} />, <Links key={3} links={links} />],
    // Converts the array of JSX components into a Option monad
    fromChildren,
    // Composes the array to a single JSX component
    composeChildren,
    // Returns Some(boxWrapper(JSX)) or None if JSX is empty
    Omap(boxWrapper),
    // Extracts the wrapped JSX or returns an empty JSX element
    getOrElse(() => <Box>error in rendering</Box>),
  )

export { Header }
