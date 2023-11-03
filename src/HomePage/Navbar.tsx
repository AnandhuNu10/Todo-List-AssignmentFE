import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
