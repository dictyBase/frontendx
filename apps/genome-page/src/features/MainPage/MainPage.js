// @flow
import React from "react"
import { Link } from "react-router-dom"

const links = [
  {
    type: "regular",
    id: "DDB_G0272608",
  },
  {
    type: "regular",
    id: "DDB_G0288511",
  },
  {
    type: "regular",
    id: "DDB_G0269114",
  },
  {
    type: "regular",
    id: "DDB_G0286355",
  },
  {
    type: "regular",
    id: "DDB_G0277399",
  },
  {
    type: "complex",
    id: "DDB_G0280531",
  },
  {
    type: "complex",
    id: "DDB_G0276267",
  },
  {
    type: "complex",
    id: "DDB_G0281211",
  },
  {
    type: "complex",
    id: "DDB_G0277589",
  },
  {
    type: "name",
    id: "sadA",
  },
  {
    type: "name",
    id: "piaA",
  },
  {
    type: "name",
    id: "svkA",
  },
  {
    type: "name",
    id: "ripA",
  },
  {
    type: "name",
    id: "far1",
  },
]

/**
 * This provides a list of example gene pages to view when you hit the index route.
 */

const MainPage = () => (
  <center>
    <h1>Genomes</h1>
    <div>Example genome pages:</div>
    {links.filter(n => n.type === "regular").map((item, index) => (
      <p key={index}>
        <Link to={`/${item.id}`}>{item.id}</Link>
      </p>
    ))}
    <div>Complex examples:</div>
    {links.filter(n => n.type === "complex").map((item, index) => (
      <p key={index}>
        <Link to={`/${item.id}`}>{item.id}</Link>
      </p>
    ))}
    <div>Gene name examples:</div>
    {links.filter(n => n.type === "name").map((item, index) => (
      <p key={index}>
        <Link to={`/${item.id}`}>{item.id}</Link>
      </p>
    ))}
  </center>
)

export default MainPage
