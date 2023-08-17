// @flow
import { MouseEventHandler } from "react"
import { styled } from "@material-ui/styles"

const Toggle = styled(({ ...other }) => <div {...other} />)({
  display: "none",
  position: "relative",
  padding: "5px",
  margin: "5px 0px",
  flexDirection: "column",
  justifyContent: "center",
  top: 0,
  height: "30px",
  width: "30px",
  cursor: "pointer",
  zIndex: 10,

  "@media (max-width: 768px)": {
    display: "flex",
  },
})
const IconBarTop = styled(({ ...other }) => <div {...other} />)({
  height: "5px",
  background: ({ theme }) => theme.text ?? "white",
  margin: "3px 0px",
  transition: "all 0.2s ease",
  transform: ({ open }) =>
    open
      ? "rotate(-45deg) translate(-25%, 7px)"
      : "rotate(0deg) translate(0px, 0px)",
})

const IconBarMiddle = styled(({ ...other }) => <div {...other} />)({
  height: "5px",
  background: ({ theme }) => theme.text ?? "white",
  margin: "3px 0px",
  transition: "all 0.1s ease",
  width: ({ open }) => (open ? "0%" : "100%"),
})
const IconBarBottom = styled(({ ...other }) => <div {...other} />)({
  height: "5px",
  background: ({ theme }) => theme.text ?? "white",
  margin: "3px 0px",
  transition: "all 0.2s ease",
  transform: ({ open }) =>
    open
      ? "rotate(45deg) translate(-25%, -6px)"
      : "rotate(0deg) translate(0px, 0px)",
})

type MenuIconProperties = {
  open: boolean
  onClick: MouseEventHandler<HTMLDivElement>
  theme: Object
}

/**
 * MenuIcon is the hamburger style icon displayed on mobile view.
 */

const MenuIcon = ({ open, onClick, theme }: MenuIconProperties) => (
  <Toggle role="button" onClick={onClick} open={open}>
    <IconBarTop open={open} theme={theme} />
    <IconBarMiddle open={open} theme={theme} />
    <IconBarBottom open={open} theme={theme} />
  </Toggle>
)

export { MenuIcon }
