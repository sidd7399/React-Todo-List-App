import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector , useDispatch } from 'react-redux';
import { Login,Logout,Register } from "./actions";

function RegisterForm({setRegisterUser,registerUser}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleLogin(username);
  // };


  // redux code 
  const dispatch = useDispatch();

  const handleRegisterForm = (e)=>{
    const rederRegister = {
      username: username,
      userLoggedIn: true
    }
     e.preventDefault();
     dispatch(Register(rederRegister))
  }

  return (
    <div>
         {registerUser?<div className=" d-flex  align-items-center">
      <h2>Login </h2>
     <button className="btn btn-primary  " onClick={()=>setRegisterUser(false)}>Login</button>
      </div>:''}
      <h2>Register</h2>
      <Form onSubmit={handleRegisterForm} className="d-flex flex-column gap-3 mt-3">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;