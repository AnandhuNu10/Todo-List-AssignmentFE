import React, { FunctionComponent } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

interface User {
  username: string;
  role?: string;
}

interface NavbarProps {
  user: User | null;
}

const Navbar: FunctionComponent<NavbarProps> = ({ user }) => {
  const welcomeMessage = user ? (
    <span>
      Welcome, {user.username}
      {user.role && ` (${user.role})`}
    </span>
  ) : 'welcome';

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className='nav-container'>
      <div tabIndex={0} onKeyDown={handleLogout} role="button">
        <div className="navbar-user">{welcomeMessage}</div>
      </div>
      <div>
        <a onClick={handleLogout}>
          <button>Logout</button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
