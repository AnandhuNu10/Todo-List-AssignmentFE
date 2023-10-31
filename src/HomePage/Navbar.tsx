import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  role?: string; // Make sure role is optional as it might not exist for all users
}

interface NavbarProps {
  user: User | null; // Make user nullable to handle the case where no user is provided
}

const Navbar: FunctionComponent<NavbarProps> = ({ user }) => {
  const welcomeMessage = user ? (
    <span>
      Welcome, {user.username}
      {user.role && ` (${user.role})`}
    </span>
  ) :'welcome';

  const navigate = useNavigate();


  return (
    <nav className='nav-container'>
      <div >
        <div className="navbar-user">{welcomeMessage}</div>
      </div>
      <div >
          <a
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            <button>Logout</button>
          </a>
        </div>
    </nav>
  );
};

export default Navbar;
