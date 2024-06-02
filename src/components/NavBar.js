import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/accounts">Accounts</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/savings">Savings</Link>
    </nav>
  );
}

export default NavBar;
