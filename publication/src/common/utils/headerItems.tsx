import { HeaderLink } from "dicty-components-header-footer"
import { Link } from "react-router-dom"
import React from "react"
import FontAwesome from "react-fontawesome"
import "font-awesome/css/font-awesome.min.css"

const generateLinks = (link: Object, i: string) =>
  link.isRouter ? (
    <Link
      style={{
        color: "#15317e",
        padding: "15px",
        textDecoration: "none",
      }}
      key={i}
      to={link.url}>
      <center>
        <FontAwesome name={link.icon} size="2x" />
        <br />
        {link.text}
      </center>
    </Link>
  ) : (
    <HeaderLink key={i} href={link.url}>
      <center>
        <FontAwesome name={link.icon} size="2x" />
        <br />
        {link.text}
      </center>
    </HeaderLink>
  )

const headerItems = [
  {
    url: "/cite",
    icon: "plus",
    text: "Cite Us",
  },
  {
    url: "/downloads",
    icon: "download",
    text: "Downloads",
  },
  {
    url: "/about",
    icon: "info-circle",
    text: "About dictyBase",
  },
  {
    url: "/login",
    icon: "sign-in",
    text: "Login",
    isRouter: true,
  },
]

const loggedHeaderItems = [
  {
    url: "/cite",
    icon: "plus",
    text: "Cite Us",
  },
  {
    url: "/downloads",
    icon: "download",
    text: "Downloads",
  },
  {
    url: "/about",
    icon: "info-circle",
    text: "About dictyBase",
  },
  {
    url: "/logout",
    icon: "sign-out",
    text: "Logout",
    isRouter: true,
  },
]

export { headerItems, loggedHeaderItems, generateLinks }
