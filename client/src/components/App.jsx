import React, { useEffect, useState } from "react";
import { Route, Routes, NavLink} from "react-router-dom";
import Login from "./Login";
import LandingPage from "./LandingPage/LandingPage";
import NavBar from "./NavBar/NavBar";
import { createGlobalStyle, styled } from 'styled-components'

function App() {
  return (
    <div>
      <GlobalStyle />
        <NavBar path ={['/', '/signup', '/login']} />      
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path='/Login'
            element={
              <Login/>
            }
          />
      </Routes>
    </div>

  );
}

export default App;

const GlobalStyle = createGlobalStyle`
    body{
      background-color: #f4ede4; 
    }
    ` 