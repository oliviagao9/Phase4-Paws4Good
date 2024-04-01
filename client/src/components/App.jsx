import React, { useEffect, useState } from "react";
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

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([])

  const onLogin=(user) =>  {
    setUser(user);
  }

  useEffect(() => {
    getUser()
    getPet()
  },[])

  const getUser = () =>{
    fetch('/api/auth')
    .then(r => {
      if(r.ok){
        r.json()
        .then(userObj => (setUser(userObj)))
      } 
    })
  }

  const getPet = () => {
    fetch('/api/pets')
      .then(r => r.json())
      .then(petData => setPets(petData))
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
    <div style={{ backgroundColor: "#f4ede4"}}>
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
          />
        }
        />
        <Route element = {<ProtectedRoute user = {user}/> }>
          <Route
              path="/fundingpage"
              element={
                <FundingPage user={user} pets={pets} />}
          />
          <Route
          path="/editprofile"
          element={
            <EditProfile
            user = {user}
            setUser={setUser}
            />
          }
          />
          <Route
          path="/addpaw"
          element={
            <AddPaw
            user = {user}
            pets = {pets}
            setPet={setPets}
            />
          }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;