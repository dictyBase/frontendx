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
        src="https://storage.dictybase.dev/editor/assets/2024-10-17/b5d1517b-6740-4e07-8d8b-761a6005a647"
        webpSrc="https://storage.dictybase.dev/editor/assets/2024-10-17/2382123c-8448-4f47-b991-06c1384d2c82"
        avifSrc="https://storage.dictybase.dev/editor/assets/2024-10-17/04cea154-6be4-4c78-9d29-0b328cd67b0e"
        height="10vh"
        width="90%"
        fit="fill" />
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
