import { Typography } from "@material-ui/core"
import { FooterItem } from "footer/src/types"
import { footerStyles } from "footer/src/styles/footerStyles"

export const FooterLink = ({ url, label }: FooterItem) => {
  const classes = footerStyles()
  return (
    <Typography
      variant="body2"
      className={`${classes.link} ${classes.separator}`}>
      <a href={url}>{label}</a>
    </Typography>
  )
}
