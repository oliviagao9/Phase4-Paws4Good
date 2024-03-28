import React, { useContext }from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'

const NavBar = ( { user,  handleLogout}) => {

  return (
    <Header>
      <Logo>
        {!user? (<Link to ='/' style={{ color: 'black' }}>
          <p>Paws4Good</p>
        </Link>) : (
        <Link to ='/fundingpage' style={{ color: 'black' }}>
          <p>Paws4Good</p>
        </Link>)}
      </Logo>
      <HeadeerRight>
        {!user ? (
        <RightSideLink style={{ color: 'black' }}>
          <Link to='/login'>Sign In</Link>
        </RightSideLink>) : (null)}
        {!user ? (
        <LeftSideLink style={{ color: 'white' }}>
          <Link to='/signup' >Get Started</Link> 
        </LeftSideLink>) :  <LeftSideLink to='/' onClick={handleLogout} > Logout </LeftSideLink>}

      </HeadeerRight>
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
const HeadeerRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 40%;
`

const RightSideLink = styled.div`
  font: 16px sans-serif;
  color: white;
  padding-right: 20px;
  border-radius: 5px;
  a {
    color:black;
    text-decoration: none;
  }
`

const LeftSideLink = styled.div`
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
