import React, { useState } from 'react'
import Navbar from './Navbar';
import GetTodo from '../Pages/GetTodo';

const UserHome = () => {

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
        <div>
        <div>
        <div className='all-todos'>
          <h2>All Todos</h2>
        </div>
              
        <GetTodo/>
        </div>
        </div>
     </div>
       
      );
}

export default UserHome
