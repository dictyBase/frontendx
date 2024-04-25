import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  ReactNode,
} from "react"
import { match, P } from "ts-pattern"
import { ThemeProvider, styled } from "@material-ui/styles"
import { pipe } from "fp-ts/function"
import { fromNullable, getOrElse } from "fp-ts/Option"
import { Brand } from "./Brand"
import { Dropdown } from "./Dropdown"
import { Link } from "./Link"
import { MenuIcon } from "./MenuIcon"
import { transitionToAuto, transitionFromAuto, wasClicked } from "../utils/dom"
import { formatNavbarData, createNavbarItems } from "../navbarItems"

const Container = styled(
  forwardRef<HTMLDivElement, { children: ReactNode }>(
    ({ ...other }, reference) => <div {...other} ref={reference} />,
  ),
)({
  width: "100%",
  zIndex: 10_000,
  "@media (max-width: 768px)": {
    overflow: "hidden",
    position: "initial",
    height: "50px",
    transition: "height 0.3s ease",
    "-ms-overflow-style:": "none",
    "&::-webkit-scrollbar": {
      width: "0 !important",
    },
  },
})

const Nav = styled(
  forwardRef<HTMLElement, { theme: any; children: ReactNode }>(
    ({ ...other }, reference) => <nav {...other} ref={reference} />,
  ),
)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  background: ({ theme }) => theme.primary ?? "#15317e",
  color: ({ theme }) => theme.text ?? "white",
  minHeight: ({ theme }) => (theme.height ? `${theme.height}px` : "50px"),
  "@media (max-width: 768px)": {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: "200px",
    minHeight: "100%",
  },
})

const Items = styled("ul")({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
  margin: 0,
  padding: 0,
  listStyleType: "none",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
})

const Header = styled("li")({
  listStyleType: "none",
  "@media (max-width: 768px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10,
    width: "100%",
  },
})

type NavbarProperties = {
  frontPageUrl: string
  stockCenterUrl: string
  items?: Array<
    | {
        dropdown: boolean
        title: string
        items: Array<{ name: string; href: string }>
      }
    | { dropdown: boolean; title: string; href: string }
    | { element: JSX.Element }
  >
  brand?: { title: string; href: string }
  theme: Object
}

/**
 * Navbar is the outer container for the navbar library.
 */

const Navbar = ({
  frontPageUrl,
  stockCenterUrl,
  items,
  brand,
  theme,
}: NavbarProperties) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [open, setOpen] = useState(false)
  const navReference = useRef<HTMLElement>(null)
  // const iconReference = useRef(null)

  const containerReference = useRef<HTMLDivElement>(null)

  const onClose = () => {
    if (!containerReference.current) return
    setOpen(false)
    transitionFromAuto(containerReference.current, 50)
  }

  const onOpen = () => {
    if (!containerReference.current) return
    setOpen(true)
    transitionToAuto(containerReference.current)
  }

  const handleTransitionend = (event: TransitionEvent) => {
    if (containerReference.current && open && event.propertyName === "height") {
      containerReference.current.style.height = "auto"
    }
  }

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      navReference.current &&
      !wasClicked(event, navReference.current) &&
      open
    ) {
      onClose()
    }
  }

  const toggle = (event: React.MouseEvent) => {
    event.nativeEvent.stopImmediatePropagation()
    event.preventDefault()

    if (open) {
      onClose()
    } else {
      onOpen()
    }
  }

  const changeDropdown = (index: number) => {
    setActiveIndex(index)
  }

  const renderBrand = () => {
    if (!brand) return <></>
    const { title, href } = brand

    return <Brand title={title} href={href} />
  }

  const renderItems = () => {
    const dropdownItems = pipe(
      items,
      fromNullable,
      getOrElse(
        () =>
          formatNavbarData(
            createNavbarItems(frontPageUrl, stockCenterUrl),
          ) as NonNullable<NavbarProperties["items"]>,
      ),
    )
    return (
      <Items>
        {dropdownItems.map((item, index) =>
          match(item)
            .with(
              {
                dropdown: true,
                items: P.select(
                  "items_",
                  P.array({ name: P.string, href: P.string }),
                ),
                title: P.select("title", P.string),
              },
              ({ items_, title }) => (
                <Dropdown
                  key={title}
                  index={index}
                  open={activeIndex === index}
                  items={items_}
                  title={title}
                  theme={theme}
                  changeDropdown={changeDropdown}
                />
              ),
            )
            .with(
              {
                dropdown: false,
                href: P.select("href", P.string),
                title: P.select("title", P.string),
              },
              ({ href, title }) => <Link href={href as string} title={title} />,
            )
            .with({ element: P.select(P.not(undefined)) }, (element) => element)
            .otherwise(() => <> This message should not appear.</>),
        )}
      </Items>
    )
  }

  useEffect(() => {
    const currentContainer = containerReference.current
    document.addEventListener("click", handleDocumentClick)
    if (currentContainer) {
      currentContainer.addEventListener("transitionend", handleTransitionend)
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick)
      if (currentContainer) {
        currentContainer.removeEventListener(
          "transitionend",
          handleTransitionend,
        )
      }
    }
  })

  return (
    <ThemeProvider theme={theme ?? {}}>
      <Container ref={containerReference}>
        <Nav theme={theme} ref={navReference}>
          <Header>
            <MenuIcon onClick={toggle} open={open} theme={theme} />
          </Header>
          {brand && renderBrand()}
          {renderItems()}
        </Nav>
      </Container>
    </ThemeProvider>
  )
}

export { Navbar }
