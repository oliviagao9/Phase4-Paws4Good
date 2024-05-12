import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import NavBar from "./NavBar/NavBar";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import FundingPage from "./FudningPage/FundingPage";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import EditProfile from "./Auth/EditProfile";
import AddPaw from "./FudningPage/AddPaw";
import { loginSession } from "./Redux/Session";
import { setPaw } from "./Redux/Paw";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    getUser()
    getPet()
  }, [])

  const getUser = () =>{
    fetch('/api/auth')
    .then(r => {
      if(r.ok){
        r.json()
        .then(userObj => {
              dispatch(loginSession(userObj));
            }
        )
      } 
    })
  }

  const getPet = () => {
    fetch('/api/pets')
      .then(r => r.json())
      .then(petData => {
          dispatch(setPaw(petData));
    });
  }

  return (
    <div style={{ backgroundColor: "#f4ede4"}}>
      <NavBar path ={['/', '/signup', '/login']} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
        path="/login"
        element={
          <Login/>
        }
        />
        <Route
        path="/signup"
        element={
          <Signup/>
        }
        />
        <Route element = {<ProtectedRoute/> }>
          <Route
              path="/fundingpage"
              element={
                <FundingPage/>}
          />
          <Route
          path="/editprofile"
          element={
            <EditProfile/>
          }
          />
          <Route
          path="/addpaw"
          element={
            <AddPaw
            />
          }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;