import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`
const Home = () => {
  return (
      <Container>
        <Link to='/gene/p2xA'>
        Gene Information for p2xA
        </Link>
      </Container>
  )
}

export default Home