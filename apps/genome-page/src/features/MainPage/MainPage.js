import React from "react"
import { Link } from "react-router-dom"

const MainPage = () => {
  return (
    <div>
      <h1>Genomes</h1>
      <div>Example genome pages:</div>
      <ul>
        <li>
          <Link to="/DDB_G0272608">DDB_G0272608</Link>
        </li>
        <li>
          <Link to="/DDB_G0288511">DDB_G0288511</Link>
        </li>
        <li>
          <Link to="/DDB_G0269114">DDB_G0269114</Link>
        </li>
        <li>
          <Link to="/DDB_G0286355">DDB_G0286355</Link>
        </li>
        <li>
          <Link to="/DDB_G0277399">DDB_G0277399</Link>
        </li>
      </ul>
    </div>
  )
}

export default MainPage
