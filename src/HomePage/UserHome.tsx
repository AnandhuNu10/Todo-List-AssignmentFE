import React, { useState } from 'react'
import AddTodo from '../Pages/AddTodo';
import Navbar from './Navbar';
import GetTodo from '../Pages/GetTodo';

const UserHome = () => {

    const username = localStorage.getItem('token') || '';
    const [selected, setSelected] = useState<number>(1);

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
        
        <div>
        <ul className="border">
        <li
          className={`lists ${selected === 1 ? 'black' : 'white'}`}
          onClick={() => {
            setSelected(1);
          }}
        >
          All Todos
        </li>
        <li
          className={`lists ${selected === 2 ? 'black' : 'white'}`}
          onClick={() => {
            setSelected(2);
          }}
        >
          Pending Todos
        </li>
      </ul>
        {selected===1&&<GetTodo/>}
        </div>
   
    
        </div>
      );
}

export default UserHome
