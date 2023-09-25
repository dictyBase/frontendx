import { useState, useEffect, useRef, forwardRef, ReactNode } from "react"
import { styled } from "@material-ui/styles"
import { wasClicked, transitionToAuto, transitionFromAuto } from "../utils/dom"

const Menu = styled(
  forwardRef<
    HTMLUListElement,
    { open: boolean; theme: any; children: ReactNode }
  >(({ ...other }, reference) => <ul {...other} ref={reference} />),
)({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: 0,
  position: "relative",
  background: ({ open, theme }) =>
    open && theme.secondary ? theme.secondary : "transparent",
  transition: "all 0.2s ease",

  "@media (max-width: 768px)": {
    alignItems: "initial",
    width: "100%",
  },
})
const Toggle = styled(({ ...other }) => <li {...other} />)({
  display: "block",
  cursor: "pointer",
  padding: "0px 20px 0px 10px",
  transition: "transform 0.3s ease, top 0.3s ease, bottom 0.3s ease",
  color: ({ theme }) => theme.text ?? "white",
  lineHeight: ({ theme }) => theme.height ?? "50px",
  "@media (max-width: 768px)": {
    lineHeight: "initial",
    position: "relative",
    margin: 0,
  },
  "&::after": {
    content: "''",
    position: "absolute",
    top: ({ open }) => (open ? "9px" : "0px"),
    bottom: 0,
    right: "5px",
    margin: "auto",
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderTop: ({ theme }) =>
      theme.text ? `5px solid ${theme.text}` : "5px solid white",
    transform: ({ open }) => (open ? "rotateX(180deg)" : "rotateX(0deg)"),
    transformOrigin: "top",
    transition: "inherit",

    "@media (max-width: 768px)": {
      top: ({ open }) => (open ? "19px" : "11px"),
      right: "25px",
      bottom: ({ open }) => (open ? "11px" : "10px"),
    },
  },
})

const CSSBorderValues = "1px solid #333"

const List = styled(
  forwardRef<
    HTMLUListElement,
    { open: boolean; theme: any; children: ReactNode }
  >(({ ...other }, reference) => <ul {...other} ref={reference} />),
)({
  position: "absolute",
  top: "100%",
  left: 0,
  display: "flex",
  flexDirection: "column",
  padding: "0px",
  height: "0px",
  minWidth: "calc(100% - 2px)",
  width: "auto",
  overflow: "hidden",
  listStyleType: "none",
  transition: "all 0.2s ease",
  background: "white",
  borderLeft: ({ theme }) =>
    theme.secondary ? `1px solid ${theme.secondary}` : CSSBorderValues,
  borderRight: ({ theme }) =>
    theme.secondary ? `1px solid ${theme.secondary}` : CSSBorderValues,
  borderBottom: ({ theme }) =>
    theme.secondary ? `1px solid ${theme.secondary}` : CSSBorderValues,
  borderBottomWidth: ({ open }) => (open ? "1px" : "0px"),
  borderBottomRightRadius: "3px",
  borderBottomLeftRadius: "3px",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
  zIndex: 10_000,
  whiteSpace: "nowrap",

  "@media (max-width: 768px)": {
    position: "relative",
    top: 0,
    border: "none",
    color: ({ theme }) => theme.secondary ?? "black",
    boxShadow: "none",
    background: ({ theme }) => theme.primary ?? "#15317e",
  },
})

const Item = styled(({ ...other }) => <li {...other} />)({
  position: "relative",
  color: ({ theme }) => theme.primary ?? "black",
  transition: "all 0.14s ease",

  "@media (max-width: 768px)": {
    color: "white",
  },
})

// eslint-disable-next-line jsx-a11y/anchor-has-content
const Link = styled(({ ...other }) => <a {...other} />)({
  textDecoration: "none",
  textAlign: "left",
  background: "white",
  color: ({ theme }) => theme.primary ?? "#15317e",
  padding: "10px 10px 10px 5px",
  display: "block",

  "&:hover": {
    color: "white",
    background: ({ theme }) => theme.primary ?? "#15317e",
  },

  "@media (max-width: 768px)": {
    padding: "10px 0px 10px 40px",
    color: "white !important",
    background: ({ theme }) => theme.primary ?? "#15317e",
  },
})

type DropdownProperties = {
  open: boolean
  changeDropdown: Function
  theme: Object
  title: String
  index: Number
  items: Array<{ name: string; href: string }>
}

/**
 * Dropdown provides a dropdown menu with a set of specified items.
 */

const Dropdown = ({
  open,
  changeDropdown,
  theme,
  title,
  index,
  items,
}: DropdownProperties) => {
  const [width, setWidth] = useState("")
  const menuReference = useRef(null)
  const listReference = useRef(null)

  const onClose = () => {
    if (!listReference.current) return
    transitionFromAuto(listReference.current, 0)
  }

  const onOpen = () => {
    if (!listReference.current) return
    transitionToAuto(listReference.current)
  }

  const handleDocumentClick = (event: any) => {
    if (!menuReference.current) return
    if (!wasClicked(event, menuReference.current) && open) {
      event.stopImmediatePropagation()
      onClose()
      changeDropdown(-1)
    }
  }

  const handleClick = () => {
    if (open) {
      changeDropdown(-1)
    } else {
      changeDropdown(index)
    }
  }

  const renderItems = () =>
    items.map((item) => (
      <Item key={item.name} theme={theme}>
        <Link href={item.href} theme={theme}>
          {item.name}
        </Link>
      </Item>
    ))

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick)
    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  })

  useEffect(() => {
    if (listReference.current) {
      setWidth(getComputedStyle(listReference.current).width)
    }
  }, [])

  useEffect(() => {
    if (open) {
      onOpen()
    } else if (!open) {
      onClose()
    }
  }, [open])

  return (
    <Menu theme={theme} open={open} ref={menuReference}>
      <Toggle theme={theme} onClick={handleClick} open={open} width={width}>
        {title}
      </Toggle>
      <List theme={theme} open={open} ref={listReference}>
        {renderItems()}
      </List>
    </Menu>
  )
}

export { Dropdown }
