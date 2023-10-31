import React, { useState } from 'react';
import './styles.css';
import Navbar from './Navbar';
import AddTodo from '../Pages/AddTodo';
import jwt from 'jsonwebtoken';

const Home: React.FC = () => {
  const [selected, setSelected] = useState<number>(1);
  const username = localStorage.getItem('token') || '';

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
  const name = decodeToken(username);
  console.log("nam",name)

  return (
    <div className="header">
      <Navbar user={name} />

      <ul className="border">
        <li
          className={`lists ${selected === 1 ? 'black' : 'white'}`}
          onClick={() => {
            setSelected(1);
          }}
        >
          Add Todos
        </li>
        <li
          className={`lists ${selected === 2 ? 'black' : 'white'}`}
          onClick={() => {
            setSelected(2);
          }}
        >
          List Of Todos
        </li>
      </ul>

      {selected === 1 && <AddTodo />} {/* Show AddTodo only when tab 1 is selected */}
    </div>
  );
};

export default Home;
