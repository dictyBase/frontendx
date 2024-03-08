/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { HeaderLink } from "dicty-components-header-footer"
import Link from "next/link"
import AddIcon from "@material-ui/icons/Add"
import FileDownloadIcon from "@material-ui/icons/GetApp"
import InfoIcon from "@material-ui/icons/Info"
import { SvgIconProps } from "@material-ui/core/SvgIcon"
import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"

type LinkProperties = {
  isRouter?: boolean
  text: string
  icon: React.ReactElement<SvgIconProps>
  url: string
}

type LinkIconProperties = {
  link: LinkProperties
}

const LinkIcon = ({ link }: LinkIconProperties) => (
  <div style={{ textAlign: "center" }}>
    {link.icon}
    <br />
    {link.text}
  </div>
)

const HeaderLinks = ({ items }: { items: LinkProperties[] }) => (
  <>
    {items.map((link: LinkProperties) =>
      link.isRouter ? (
        <div key={link.url} style={{ padding: "15px" }}>
          <Link href={link.url} passHref>
            <a>
              <LinkIcon link={link} />
            </a>
          </Link>
        </div>
      ) : (
        <HeaderLink key={link.url} href={link.url}>
          <LinkIcon link={link} />
        </HeaderLink>
      ),
    )}
  </>
)

const headerItems = [
  {
    url: "/community/citation",
    icon: <AddIcon fontSize="large" />,
    text: "Cite Us",
  },
  {
    url: "/downloads",
    icon: <FileDownloadIcon fontSize="large" />,
    text: "Downloads",
  },
  {
    url: "/about",
    icon: <InfoIcon fontSize="large" />,
    text: "About dictyBase",
  },
  {
    url: "/login",
    icon: <LoginIcon fontSize="large" />,
    text: "Login",
    isRouter: true,
  },
]

const loggedHeaderItems = [
  {
    url: "/community/citation",
    icon: <AddIcon fontSize="large" />,
    text: "Cite Us",
  },
  {
    url: "/downloads",
    icon: <FileDownloadIcon fontSize="large" />,
    text: "Downloads",
  },
  {
    url: "/about",
    icon: <InfoIcon fontSize="large" />,
    text: "About dictyBase",
  },
  {
    url: "/logout",
    icon: <LogoutIcon fontSize="large" />,
    text: "Logout",
    isRouter: true,
  },
]

export { headerItems, loggedHeaderItems, HeaderLinks }
