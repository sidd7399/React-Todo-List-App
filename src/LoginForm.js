import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector , useDispatch } from 'react-redux';
import { Login,Logout } from "./actions";
import RegisterForm from "./RegisterForm";

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser, setRegisterUser] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleLogin(username);
  // };


  // redux code 
  const dispatch = useDispatch();

  const handleLoginForm = (e)=>{
    const rederLogin = {
      username: username,
      userLoggedIn: true
    }
     e.preventDefault();
     dispatch(Login(rederLogin))
  }

  return (
    <div>
       {registerUser?'':<div className=" d-flex  align-items-center">
      <h2>Register User </h2>
     <button className="btn btn-danger " onClick={()=>setRegisterUser(true)}>Register</button>
      </div>}
      {
        registerUser?<RegisterForm setRegisterUser={setRegisterUser} registerUser={registerUser}/>:
      <>
    
      <h2>Login </h2>

      <Form onSubmit={handleLoginForm} className="d-flex flex-column gap-3 mt-3">
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
            Submit
          </Button>
        </div>
      </Form>
      </>}
    </div>
  );
}

export default LoginForm;