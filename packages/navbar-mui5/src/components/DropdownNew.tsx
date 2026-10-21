import { useEffect, useRef } from "react"
import { styled } from "@mui/styles"
import { wasClicked, transitionToAuto, transitionFromAuto } from "../utils/dom"

const Menu = styled("li")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
})

const Toggle = styled("button")({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "8px 16px",
  border: "none",
  background: "transparent",
  color: "inherit",
  fontSize: "0.9rem",
  fontWeight: 500,
  cursor: "pointer",
  whiteSpace: "nowrap",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
  },
})

const Arrow = styled("span")({
  fontSize: "0.7rem",
  marginLeft: "2px",
  transition: "transform 0.2s ease",
})

const Panel = styled("div")({
  position: "absolute",
  top: "100%",
  left: 0,
  display: "flex",
  flexDirection: "column",
  height: "0px",
  minWidth: "320px",
  overflow: "hidden",
  background: "white",
  color: "#333",
  borderRadius: "0 0 8px 8px",
  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
  zIndex: 10_000,
  "@media (max-width: 768px)": {
    position: "relative",
    minWidth: "100%",
    boxShadow: "none",
    borderRadius: 0,
    background: "transparent",
    color: "white",
  },
})

const Item = styled("a")({
  display: "flex",
  flexDirection: "column",
  padding: "10px 16px",
  textDecoration: "none",
  color: "#333",
  borderBottom: "1px solid #f0f0f0",
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    background: "rgba(0, 64, 128, 0.06)",
  },
  "@media (max-width: 768px)": {
    color: "white",
    borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
    },
  },
})

const ItemName = styled("span")({
  fontSize: "0.9rem",
  fontWeight: 600,
  "@media (max-width: 768px)": {
    color: "white",
  },
})

const ItemDescription = styled("span")({
  fontSize: "0.75rem",
  color: "#666",
  marginTop: "2px",
  lineHeight: 1.4,
  "@media (max-width: 768px)": {
    color: "rgba(255, 255, 255, 0.75)",
  },
})

type DropdownItem = {
  name: string
  href: string
  description: string | undefined
}

type DropdownNewProperties = {
  open: boolean
  onChange: (index: number) => void
  title: string
  index: number
  items: Array<DropdownItem>
}

const DropdownNew = ({
  open,
  onChange,
  title,
  index,
  items,
}: DropdownNewProperties) => {
  const menuReference = useRef<HTMLLIElement>(null)
  const panelReference = useRef<HTMLDivElement>(null)

  const onClose = () => {
    if (!panelReference.current) return
    transitionFromAuto(panelReference.current, 0)
  }

  const onOpen = () => {
    if (!panelReference.current) return
    transitionToAuto(panelReference.current)
  }

  const handleDocumentClick = (event: MouseEvent) => {
    if (!menuReference.current) return
    if (!wasClicked(event, menuReference.current) && open) {
      event.stopImmediatePropagation()
      onClose()
      onChange(-1)
    }
  }

  const handleToggle = () => {
    if (open) {
      onChange(-1)
    } else {
      onChange(index)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick)
    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  })

  useEffect(() => {
    if (open) {
      onOpen()
    } else {
      onClose()
    }
  }, [open])

  const renderItems = () =>
    items.map((item) => (
      <Item key={item.name} href={item.href}>
        <ItemName>{item.name}</ItemName>
        {item.description && (
          <ItemDescription>{item.description}</ItemDescription>
        )}
      </Item>
    ))

  return (
    <Menu ref={menuReference}>
      <Toggle onClick={handleToggle}>
        {title}
        <Arrow>{open ? "⌃" : "⌄"}</Arrow>
      </Toggle>
      <Panel data-testid={`navbar-dropdown-${title}`} ref={panelReference}>
        {renderItems()}
      </Panel>
    </Menu>
  )
}

export { DropdownNew }
