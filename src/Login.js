import React from 'react';
import './App.css';
import LoginForm from './Components/LoginForm';


function Login() {

  return (
    <div className="container">

      <div className="login">

        <h1>Login</h1>

        <LoginForm />{/* Render Login Form */}

      </div>
              
    </div>
  );
}



export default Login;
