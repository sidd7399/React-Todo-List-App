import React, { useState } from 'react';
import LoginForm from './LoginForm';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { Button, Container } from 'react-bootstrap';
import { TodoProvider } from './Context';
import { useTodoContext } from './Context';

function App() {

  const { state, loading, logout } = useTodoContext();
  console.log(state);
  if (loading) {
    return <p style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'50px', height:'500px',width:'100vw',fontWeight:'bolder'}}>Loading...</p>;
  }



  // const handleLogin = (username) => {
  //   setUser(username);
  // };

 

  return (
    
      <Container className='mt-5'>
        {localStorage.getItem('token') ? (
          <div className='d-flex flex-column gap-3'>
            <div>
              <Button variant='danger' onClick={logout}>Logout</Button>
            </div>
            <h2>Welcome, {state?.user?.username}</h2>
            <TodoForm user={state?.user?.username}/>
            {/* Use todosList from the context */}
            <TodoList />
          </div>
        ) : (
          <LoginForm />
        )}
      </Container>
  );
}

export default App;