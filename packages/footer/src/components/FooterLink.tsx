import { Typography } from "@material-ui/core"
import { FooterItem } from "footer/src/types"
import { footerStyles } from "footer/src/styles/footerStyles"

export const FooterLink = ({ url, description }: FooterItem) => {
  const classes = footerStyles()
  return (
    <Typography
      variant="body2"
      className={`${classes.link} ${classes.separator}`}>
      <a href={url}>{description}</a>
    </Typography>
  )
}
