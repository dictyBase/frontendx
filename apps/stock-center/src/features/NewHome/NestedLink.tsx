import { MouseEventHandler, FC } from "react"
import { Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

type NestedLinkProperties = {
  href: string
}

const NestedLink: FC<NestedLinkProperties> = ({ href, children }) => {
  const navigate = useNavigate()
  const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    navigate(href)
  }

  return (
    <Typography
      component={Link}
      onClick={onClick}
      to={href}
      sx={{
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "#3182ce",
        textDecoration: "none",
        "&:hover": { color: "#1a56db" },
      }}>
      {children}
    </Typography>
  )
}

export { NestedLink }
