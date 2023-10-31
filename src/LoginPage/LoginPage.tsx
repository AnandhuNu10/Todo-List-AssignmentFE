import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    token: string;
  };
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:3003/auth/login',
        {
          username,
          password,
        }
      );

      const { statusCode, message, data } = response.data;

      if (statusCode === 201) {
        const token = data.token;
        const decodedToken = decodeToken(token);

        if (decodedToken) {
          localStorage.setItem('token', token);
          toast.success('Login successful', {
            position: 'top-right',
            autoClose: 3000,
          });

          if (decodedToken.role === 'Admin') {
            navigate('/home/admin');

          } else if (decodedToken.role === 'user') {
         
            navigate('/home');
          } else {
            console.error('Invalid role in token');
            toast.error('Invalid role in token', {
              position: 'top-right',
              autoClose: 3000,
            });
          }
        }
      } else {
        console.error(`Login failed: ${message}`);
        toast.error(`Login failed: ${message}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('Invalid credentials!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const decodeToken = (token: string) => {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return null;
  };

  return (
    <div className="App">
      <div>
        <h1>Login Page</h1>
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />

          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LoginPage;
