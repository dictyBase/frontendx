import { useState, useEffect, useRef, ReactNode, forwardRef } from "react"
import { ThemeProvider, styled } from "@mui/styles"
import { type Theme } from "@mui/material"
import { StyledEngineProvider } from "@mui/material/styles"
import { pipe } from "fp-ts/function"
import { fromNullable, getOrElse } from "fp-ts/Option"
import { DropdownNew } from "./DropdownNew"
import { MenuIcon } from "./MenuIcon"
import { transitionToAuto, transitionFromAuto } from "../utils/dom"
import { formatNavbarData, createNavbarItems } from "../navbarItems"

const Container = styled("div")({
  width: "100%",
  zIndex: 10_000,
  position: "sticky",
  top: 0,
  "@media (max-width: 768px)": {
    overflow: "hidden",
    position: "initial",
    height: "50px",
    transition: "height 0.3s ease",
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
  alignItems: "center",
  position: "relative",
  zIndex: 999,
  background: ({ theme }) => theme.palette?.primary?.main ?? "#004080",
  color: "white",
  minHeight: "52px",
  padding: "0 16px",
  gap: "4px",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    gap: 0,
    minHeight: "100%",
  },
})

const BrandSection = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  "@media (max-width: 768px)": {
    width: "100%",
    justifyContent: "space-between",
    padding: "0 16px",
    minHeight: "50px",
  },
})

const BrandLink = styled("a")({
  display: "block",
  textDecoration: "none",
  color: "white",
  fontSize: "1.3rem",
  fontWeight: 700,
  whiteSpace: "nowrap",
})

const BetaBadge = styled("span")({
  fontSize: "0.65rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  background: "rgba(255, 255, 255, 0.15)",
  color: "white",
  padding: "2px 8px",
  borderRadius: "4px",
  whiteSpace: "nowrap",
})

const Items = styled("ul")({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "stretch",
  margin: 0,
  padding: 0,
  marginLeft: "24px",
  listStyleType: "none",
  gap: "2px",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
    marginLeft: 0,
    gap: 0,
  },
})

const Actions = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginLeft: "auto",
  gap: "8px",
  "&& .MuiButtonBase-root": {
    color: "white",
  },
  "&& .MuiSvgIcon-root": {
    color: "white",
  },
  "&& .MuiTypography-root": {
    color: "white",
  },
  "@media (max-width: 768px)": {
    marginLeft: 0,
    padding: "12px 16px",
    width: "100%",
    justifyContent: "center",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    marginTop: "8px",
  },
})

type NavbarItem = {
  dropdown: boolean
  title: string
  items: Array<{ name: string; href: string; description: string | undefined }>
}

type NavbarNewProperties = {
  frontPageUrl: string
  stockCenterUrl: string
  items?: Array<NavbarItem>
  theme: Theme
  loginElement?: ReactNode
}

const NavbarNew = ({
  frontPageUrl,
  stockCenterUrl,
  items,
  theme,
  loginElement,
}: NavbarNewProperties) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [mobileOpen, setMobileOpen] = useState(false)
  const containerReference = useRef<HTMLDivElement>(null)

  const onClose = () => {
    if (!containerReference.current) return
    setMobileOpen(false)
    transitionFromAuto(containerReference.current, 50)
  }

  const onOpen = () => {
    if (!containerReference.current) return
    setMobileOpen(true)
    transitionToAuto(containerReference.current)
  }

  const handleTransitionend = (event: TransitionEvent) => {
    if (
      containerReference.current &&
      mobileOpen &&
      event.propertyName === "height"
    ) {
      containerReference.current.style.height = "auto"
    }
  }

  const toggleMobile = (event: React.MouseEvent) => {
    event.nativeEvent.stopImmediatePropagation()
    event.preventDefault()

    if (mobileOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  const changeDropdown = (index: number) => {
    setActiveIndex(index)
  }

  const renderItems = () => {
    const dropdownItems = pipe(
      items,
      fromNullable,
      getOrElse(
        () =>
          formatNavbarData(
            createNavbarItems(frontPageUrl, stockCenterUrl),
          ) as Array<NavbarItem>,
      ),
    )
    return (
      <Items>
        {dropdownItems.map((item, index) => (
          <DropdownNew
            key={item.title}
            index={index}
            open={activeIndex === index}
            items={item.items}
            title={item.title}
            onChange={changeDropdown}
          />
        ))}
      </Items>
    )
  }

  useEffect(() => {
    const currentContainer = containerReference.current
    if (currentContainer) {
      currentContainer.addEventListener("transitionend", handleTransitionend)
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener(
          "transitionend",
          handleTransitionend,
        )
      }
    }
  })

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme ?? {}}>
        <Container ref={containerReference}>
          <Nav theme={theme}>
            <BrandSection>
              <MenuIcon
                onClick={toggleMobile}
                open={mobileOpen}
                theme={theme}
              />
              <BrandLink href="/">dictyBase</BrandLink>
              <BetaBadge>Beta</BetaBadge>
            </BrandSection>
            {renderItems()}
            {loginElement && <Actions>{loginElement}</Actions>}
          </Nav>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export { NavbarNew }
