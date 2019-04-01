// @flow
import React from "react"
import { Link } from "react-router-dom"

const links = ["30797173", "30048658", "16769729", "18366659", "18974179"]

/**
 * This provides a list of example gene pages to view when you hit the index route.
 */

const MainPage = () => (
  <div style={{ textAlign: "center" }}>
    <h1>Publications</h1>
    <div>Example publication pages:</div>
    {links.map((item, index) => (
      <p key={index}>
        <Link to={`/${item}`}>{item}</Link>
      </p>
    ))}
  </div>
)

export default MainPage
