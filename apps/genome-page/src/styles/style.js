import styled, { injectGlobal } from "styled-components"
import { Tabs, TabItem } from "rebass"
import Button from "@material-ui/core/Button"
import { lighten } from "polished"
import "typeface-roboto"
import { Link } from "react-router-dom"

injectGlobal([
  `
    html {
        height: 100%;
    }
    body {
        margin: auto;
        height: 100%;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.42857;
        color: #333;
        background-color: #fff;
    }
`,
])

export const Root = styled.div`
  height: 100vh;
`

export const ReactVirtualizedTable = styled.div`
  .ReactVirtualized__Table__headerRow {
    background-color: #e5efff;
  }

  .ReactVirtualized__Table__Grid {
    margin: 0px auto;
  }
`

export const GoHeaderStyle = styled.div`
  text-align: left;
  background: #3f51b5;
  color: #fff;
  padding: 1px 10px 1px;
  width: 885px;
`

export const TabContainer = styled(Tabs)`
  border-bottom: 0px;
`

export const Tab = styled(TabItem)`
  background: ${props =>
    !props.active && props.theme.secondary ? "#A3BAE9" : "#15317e"};
  border-top: 1px solid white;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  margin-right: 3px;
  margin-top: 1px;
  padding: 5px;
  width: 150px;
  color: ${props =>
    !props.active && props.theme.secondary ? "black" : "white"};
  border-color: ${props => (props.active ? "black" : "")};

  &:hover {
    background: ${props =>
      !props.active && props.theme.secondary
        ? lighten(0.1, props.theme.secondary)
        : "#15317e"};
    color: ${props =>
      !props.active && props.theme.secondary ? "black" : "white"};
    cursor: pointer;
  }
`

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
