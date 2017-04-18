import React, { Component } from 'react'
import styled from 'styled-components'

const ListItem = styled.li`
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const A = styled.a`
  display: block;
  color: ${ props => props.theme.text ? props.theme.text : 'white' };
  text-decoration: none;
  margin: auto;
  padding: 10px;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export default class Link extends Component {
    render() {
        const { title, href } = this.props
        return (
            <ListItem>
              <A href={ href }>{ title }</A>
            </ListItem>
        )
    }
}
