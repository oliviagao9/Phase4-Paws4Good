import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'


const NavBar = () => {

  return (
    <Header>
      <Logo>
        <Link to ='/' style={{ color: 'black' }}>
          <p>Paws4Good</p>
        </Link>
      </Logo>

      <HeaderLeft>
        <SingupLink style={{ color: 'black' }}>
          <Link to='/login' className='nav-login-link'>Sign In</Link>

        </SingupLink>

        <LoginLink style={{ color: 'white' }}>
          <Link to='/signup' className='nav-signup-link'>Get Started</Link> 
        </LoginLink>
      </HeaderLeft>

    </Header>
  )
}

export default NavBar

const Header = styled.div`
  height: 69px;
  font-family: 'Poppins', sans-serif;
  z-index: 5;
  background-color: #eee1cd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: flex-start;
  margin-left: 5%;
  font-size: 25px;
  padding-left: 7px;
  padding-top: 7px;
  font-weight: 900;
  a {
    color:black;
    text-decoration: none;
  }
`
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 40%;
`

const SingupLink = styled.div`
  font: 16px sans-serif;
  color: white;
  padding-right: 20px;
  border-radius: 5px;
  a {
    color:black;
    text-decoration: none;
  }
`

const LoginLink = styled.div`
  font: 14px sans-serif;
  color: white;
  padding: 12px 15px;
  background-color: #611f69;
  margin-right: 7%;
  border-radius: 5px;  
  a {
    color:white;
    text-decoration: none;
  }
`
