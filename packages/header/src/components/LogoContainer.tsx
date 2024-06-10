import Typography from "@material-ui/core/Typography"
import type { ReactNode } from "react"
import { Image } from "@dictybase/dicty-image"
import { headerStyles } from "../styles/headerStyles"

interface ReactChildrenProperty {
  children: ReactNode
  frontPageUrl: string
}

const ImgContainer = () => (
  <Image
    src="https://storage.dictybase.dev/editor/assets/2024-06-07/7ab7ca20-5e64-4cd4-92ea-93e2e073df98"
    webpSrc="https://storage.dictybase.dev/editor/assets/2024-06-07/5811c714-ae57-4b33-83ba-3d45b6db7797"
    avifSrc="https://storage.dictybase.dev/editor/assets/2024-06-07/1d4ff99a-2b6f-436c-8eaa-2c6f41c56379"
    height="10vh"
    width="90%"
    fit="fill"
  />
)

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
