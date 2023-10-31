import React, { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  date: string;
  completed: boolean;
}

const GetTodo = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [todos, setTodos] = useState<Todo[]>([]); // Provide a type for todos

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTodoClick = (todoId: number) => {
    // Find the clicked todo and toggle its "completed" status
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedTodo = { ...todo, completed: !todo.completed };    
        setTodoStatus(todoId, updatedTodo.completed); // Call the API to update todo status
        return updatedTodo;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const setTodoStatus = (todoId: number, completed: boolean) => {
    const token = localStorage.getItem('token');
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

    const id = decodeToken(token || '');

    if (id) {
      fetch(`http://localhost:3003/todos/update-todo-status/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Todo status updated:', data);
        })
        .catch((error) => {
          console.error('Error updating todo status:', error);
        });
    }
  };

  // Fetch todos from the API and set them in the state
  useEffect(() => {
    const token = localStorage.getItem('token');
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

    const id = decodeToken(token || '');
    if (id) {
      fetch(`http://localhost:3003/todos/find-all-todo/${id.id}`)
        .then((response) => response.json())
        .then((data: Todo[]) => {
          setTodos(data);
        })
        .catch((error) => {
          console.error('Error fetching todos:', error);
        });
    }
  }, []); // <- Make sure to close the useEffect with a closing parenthesis

  return (
    <div>
      <div className="date-time">
        <strong>{currentDateTime.toLocaleString()}</strong>
      </div>
      <div className="card">
        <h3>Your Todos</h3>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoClick(todo.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetTodo;
