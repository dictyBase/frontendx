import Typography from "@material-ui/core/Typography"
import type { ReactNode } from "react"
import { Image } from "@dictybase/dicty-image"
import { headerStyles } from "../styles/headerStyles"
import { resolveImage } from "../helper/resolveImage"
import LogoPng from "../images/logo.png"
import LogoWebp from "../images/logo.webp"

interface ReactChildrenProperty {
  children: ReactNode
  frontPageUrl: string
}

const ImgContainer = () => {
  const png = resolveImage(LogoPng)
  const webp = resolveImage(LogoWebp)
  return <Image src={png} webpSrc={webp} height="10vh" width="90%" fit="fill" />
}

const TitleContainer = ({ title }: { title: string }) => (
  <Typography variant="subtitle1" className={headerStyles().logoTitle}>
    {title}
  </Typography>
)

const LogoContainer = ({ children, frontPageUrl }: ReactChildrenProperty) => (
  <div className={headerStyles().logoContainer}>
    <a href={frontPageUrl}>{children}</a>
  </div>
)

export { ImgContainer, TitleContainer, LogoContainer }
