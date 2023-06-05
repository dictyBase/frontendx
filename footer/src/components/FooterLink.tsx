import { Typography } from "@material-ui/core"
import { FooterItem } from "@dictyBase/footer/src/types"
import { footerStyles } from "@dictyBase/footer/src/styles/footerStyles"

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
