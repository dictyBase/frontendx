import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import type { ReactNode } from "react"
import { Image } from "@dictybase/dicty-image"
import { headerStyles } from "../styles/headerStyles"
import AvifImage from "../images/logo.avif"
import PngImage from "../images/logo.png"
import WebPImage from "../images/logo.webp"

interface ReactChildrenProperty {
  children: ReactNode
}

const ImgContainer = () => (
  <Image
    src={PngImage}
    webpSrc={WebPImage}
    avifSrc={AvifImage}
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

const LogoContainer = ({ children }: ReactChildrenProperty) => (
  <Box className={headerStyles().logoContainer}>
    {/* eslint-disable-next-line dot-notation */}
    <a href={import.meta.env["VITE_APP_FRONTPAGE_URL"]}>{children}</a>
  </Box>
)

export { ImgContainer, TitleContainer, LogoContainer }
