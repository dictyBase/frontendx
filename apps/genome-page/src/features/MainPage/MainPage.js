import React from "react"
import { Link } from "react-router-dom"

const MainPage = () => {
  return (
    <center>
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
      <div>Complex examples:</div>
      <p>
        <Link to="/DDB_G0280531">DDB_G0280531</Link>
      </p>
      <p>
        <Link to="/DDB_G0276267">DDB_G0276267</Link>
      </p>
      <p>
        <Link to="/DDB_G0281211">DDB_G0281211</Link>
      </p>
      <p>
        <Link to="/DDB_G0277589">DDB_G0277589</Link>
      </p>
    </center>
  )
}

export default MainPage
