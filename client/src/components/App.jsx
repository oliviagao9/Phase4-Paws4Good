import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import NavBar from "./NavBar/NavBar";
import { createGlobalStyle, styled } from 'styled-components'
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import FundingPage from "./FudningPage/FundingPage";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  const onLogin=(user) =>  {
    setUser(user);
  }

  useEffect(() => {
    getUser()
  },[])

  function getUser () {
    fetch('/api/auth')
    .then(r => {
      if(r.ok){
        r.json()
        .then(userObj => (setUser(userObj)))
      } 
    })
  }

  const handleLogout = () => {
    fetch('/api/logout', {
      method: "DELETE",
      mode: 'cors',
      credentials: 'include'
    }).then((r) => {
        if (r.status === 204) {
          setUser(null);
          navigate("/");
        } else {  r.json().then(data => 
          alert(data.errors)
          )
        }
    });
  };

  return (
    <div>
      <GlobalStyle />
        <NavBar path ={['/', '/signup', '/login']} 
        user = {user}
        handleLogout={handleLogout} />     
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
          path="/login"
          element={
            <Login
            onLogin={onLogin}
            user = {user}
            />
          }
          />
          <Route
          path="/signup"
          element={
            <Signup
              onLogin={onLogin}
              setErrors={setErrors}
            />
          }
          />
          <Route element = {<ProtectedRoute user = {user}/> }>
            <Route
                path="/fundingpage"
                element={
                  <FundingPage user={user} />}
            />
          </Route>

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