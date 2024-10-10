import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar2.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual login state
  const [menuOpen, setMenuOpen] = useState(false); // State to manage hamburger menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="left">
        <NavLink to="/" className="link" activeClassName="active-link">
          <h1 className="brand">Shred .</h1>
        </NavLink>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <NavLink to="/nutrition" className="link" activeClassName="active-link">
          Nutrition
        </NavLink>
        <NavLink to="/exercise" className="link" activeClassName="active-link">
          Exercise
        </NavLink>
        <NavLink to="/homepage" exact className="link" activeClassName="active-link">
          Profile
        </NavLink>
        <NavLink to="/community" exact className="link" activeClassName="active-link">
          Community
        </NavLink>
        {/* <span className="nav-main"> */}
          <NavLink to="/" exact className="link" activeClassName="active-link">
            <button>Sign Out</button>
          </NavLink>
        {/* </span> */}
      </div>
    </nav>
  );
}

export default Navbar;
