import React, { Component } from 'react';

class Header extends Component {
  render () {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            Sign In
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;