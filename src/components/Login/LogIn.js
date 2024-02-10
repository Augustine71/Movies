// AuthComponent.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import clearData from "../../store/listSlice"

import { Link } from "react-router-dom"

import './LogIn.css'

const AuthComponent = () => {
  const dispatch = useDispatch();
    const { loginWithPopup, logout, isAuthenticated } = useAuth0();

    const handleLogout = () => {
      // Dispatch action to clear data
      dispatch(clearData());
  
      // Logout from Auth0
      logout({ returnTo: window.location.origin });
    };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Link to="/mylist" style={{textDecoration: "none"}}><span>My List</span></Link>
          <button onClick={handleLogout} className='log'>Log Out</button>
          
        </div>
      ) : (
        <button onClick={() => loginWithPopup() } className='log'>Log In</button>
      )}
    </div>
  );
};

export default AuthComponent;
