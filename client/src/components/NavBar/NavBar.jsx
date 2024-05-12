import {Link, useNavigate} from "react-router-dom";
import "./NavBar.css"
import { logoutSession } from "../Redux/Session.jsx";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";

const NavBar = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.session);
    const dispatch = useDispatch();

    const handleLogout = () => {
        fetch('/api/logout', {
            method: "DELETE",
            mode: 'cors',
            credentials: 'include'
        }).then((r) => {
            if (r.status === 204) {
                dispatch(logoutSession(null));
                navigate("/");
                console.log(user == null);
            } else {  r.json().then(data =>
                alert(data.errors)
            )
            }
        });
    };

  return (
    <div className= "header">
      <div className= "headerLeft">
        {!user.user ? (
          <Link to ='/' style={{ color: 'black' }}>
            <p>Paws4Good</p>
          </Link>
          ) : (
            <Link to ='/fundingpage' style={{ color: 'black' }}>
              <p>Paws4Good</p>
            </Link>
        )}
      </div>
      <div className="headerRight">
        {!user.user ? (
          <>
            <div className="leftSideLink" style={{ color: 'black' }}>
              <Link to='/login'>Sign In</Link>
            </div>
            <div className="rightSideLink" style={{ color: 'white' }}>
            <Link to='/signup' >Get Started</Link> 
            </div>
          </>
        ):(
          <>
            <div className="leftSideLink" style={{ color: 'black' }}>
              <Link to='/addpaw'> Add Paw</Link>
            </div>
            <div className="leftSideLink" style={{ color: 'black' }}>
              <Link to='/editprofile'> Edit Profile</Link>
            </div>
            <div className="rightSideLink"> 
              <Link to='/' onClick={() => handleLogout() }> Logout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar

