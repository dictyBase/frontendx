import styled, { injectGlobal } from "styled-components"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import "typeface-roboto"

injectGlobal([
  `
    html {
        height: 100%;
    }
    body {
        margin: auto;
        height: 100%;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        line-height: 1.42857;
        color: #333;
        background-color: #fff;
    }
`,
])

export const RouterLink = styled(Link)`
  color: #428bca;
  text-decoration: none;
`

export const Jumbotron = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  color: inherit;
  background-color: #eee;
  text-align: center;

  h1 {
    color: inherit;
  }

  p {
    margin-bottom: 15px;
    font-size: 21px;
    font-weight: 200;
  }
`

export const SaveButton = styled(Button)`
  && {
    width: 100%;
    background-color: #15317e;
  }
`
