import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = ( { user,  handleLogout}) => {

  return (
    <div className= "header">
      <div className= "headerLeft">
        {!user ? (
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
        {!user ? (
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
              <Link to='/' onClick={handleLogout}> Logout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar

