import React from 'react';
import './styles.css';
import Navbar from './Navbar';
import AddTodo from '../components/AddTodo';

const Home: React.FC = () => {
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

      <div className='add-todos'>
        <h2>Add Todos</h2>
      </div>
   
      <AddTodo /> 
    </div>
  );
};

export default Home;
