import React from "react"
import { Navigate } from "react-router-dom"
import { ACCESS } from "@dictybase/auth-mui5"

const Home = () => <Navigate to="/ada2" replace />

// eslint-disable-next-line import/no-default-export
export default Home
export const access = ACCESS.public
