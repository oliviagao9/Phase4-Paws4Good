import React from "react"
import styled from 'styled-components'

function LandingPage() {
    return (
      <HomePage>
        <h1>
        Paws4Good
        </h1>
        <h3>
          Raise funds for veterinary expenses, advocate for animal welfare, rescue efforts, and provide essential support for all your beloved furry companions through Paws4Good.
        </h3>
        <HomePageImage>
          <img src="https://community.chipotle.com/wp-content/uploads/2021/01/fundraising-for-animals.png" width="600" height="380" alt="header_picture">
          </img>
        </HomePageImage>
      </HomePage>
    )
}

export default LandingPage

const HomePage = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: #f4ede4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomePageImage = styled.div`
margin-top: 30px;
`