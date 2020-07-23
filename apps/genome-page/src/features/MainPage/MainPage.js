// @flow
import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import links from "./linksData"

/**
 * MainPage provides a list of example gene pages to view when you hit the index route.
 */

const MainPage = () => (
  <div>
    <Helmet>
      <title>dictyBase Genomes</title>
      <meta name="description" content="dictyBase gene page examples" />
    </Helmet>
    <center>
      <h1>Genomes</h1>
      <div>Example genome pages:</div>
      {links
        .filter((n) => n.type === "regular")
        .map((item, index) => (
          <p key={index}>
            <Link to={`/${item.id}`}>{item.id}</Link>
          </p>
        ))}
      <div>Complex examples:</div>
      {links
        .filter((n) => n.type === "complex")
        .map((item, index) => (
          <p key={index}>
            <Link to={`/${item.id}`}>{item.id}</Link>
          </p>
        ))}
      <div>Gene name examples:</div>
      {links
        .filter((n) => n.type === "name")
        .map((item, index) => (
          <p key={index}>
            <Link to={`/${item.id}`}>{item.id}</Link>
          </p>
        ))}
    </center>
  </div>
)

export default MainPage
