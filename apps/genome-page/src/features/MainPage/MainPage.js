import React from "react"
import { Link } from "react-router-dom"

const MainPage = () => {
  return (
    <div>
      <h1>Genomes</h1>
      <div>Example genome pages:</div>
      <p>
        <Link to="/DDB_G0272608">DDB_G0272608</Link>
      </p>
      <p>
        <Link to="/DDB_G0288511">DDB_G0288511</Link>
      </p>
      <p>
        <Link to="/DDB_G0269114">DDB_G0269114</Link>
      </p>
      <p>
        <Link to="/DDB_G0286355">DDB_G0286355</Link>
      </p>
      <p>
        <Link to="/DDB_G0277399">DDB_G0277399</Link>
      </p>
    </div>
  )
}

export default MainPage
