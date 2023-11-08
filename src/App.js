import React, { useState } from 'react';
import LoginForm from './LoginForm';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { Button, Container } from 'react-bootstrap';
import { useSelector , useDispatch } from 'react-redux';
import { Login,Logout } from "./actions";

function App() {
  const [user, setUser] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleLogin = (username) => {
    setUser(username);
  };

  // const handleLogout = () => {
  //   setUser(null);
  // };

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  // redux code  
  
  
  const dispatch = useDispatch();
  
  const handleLogoutForm = (e)=>{
    const rederLogin = {
      username: 'Admin',
      userLoggedIn: false
    }
    dispatch(Logout(rederLogin))
  }


  const userInfo = useSelector((state)=>state.authReducer)
  const todosList = useSelector((state)=>state.todoReducer)
  // console.log('redux state ', userInfo);
  console.log('todo list', todosList)

  return (
    <Container  className='mt-5'>
      {userInfo?.loggedIn ? (
        <div className='d-flex flex-column gap-3'>
        <div>
          <Button variant='danger' onClick={handleLogoutForm}>Logout</Button>
        </div>
          <h2>Welcome, {userInfo?.userName}</h2>
          <TodoForm addTodo={addTodo} user={userInfo?.userName} />
          <TodoList todos={todosList} />
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
        
      )}
    </Container>
  );
}

export default App;