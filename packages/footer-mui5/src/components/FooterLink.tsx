import { Typography } from "@mui/material"
import { FooterItem } from "../types"
import { footerStyles } from "../styles/footerStyles"

export const FooterLink = ({ url, label }: FooterItem) => {
  const { classes } = footerStyles()
  return (
    <Typography
      key={url}
      component="a"
      href={url}
      variant="body2"
      sx={(t) => ({ color: t.palette.primary.contrastText })}
      className={`${classes.separator}`}>
      {label}
    </Typography>
  )
}
