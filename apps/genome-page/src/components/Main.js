import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
justify-content: space-around;
flex-direction: row;
`
const Main = () => {
  return (
      <Container>
        <Link to='/annotations/all'>
          all
        </Link>
        <Link to='/annotations/manual'>
          manual
        </Link>
        <Link to='/annotations/experimental'>
          experimental
        </Link>
        <Link to='/annotations/electronic'>
          electronic
        </Link>
      </Container>
  )
}

export default Main