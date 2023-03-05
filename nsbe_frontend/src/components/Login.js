import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import axios from 'axios';
import Logo from './img/Logo.png'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  const postEmail = async () => {

    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    try {
      const body = { email }; // convert to JSON since body needs to be in JSON format
      console.log(JSON.stringify(body));
      console.log(body);


      const response = await fetch('http://127.0.0.1:5000/email/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type'
        },
        body: JSON.stringify(body),
      }).then(response => {
        console.log(response)
      })
    } catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (

    <div className="register">
      <div className="register__container">
        <p className="title2">Welcome to</p>
        <p className="title3">BrutalityWatch</p>
        <img className="Logo" src={Logo}></img>


        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="register__btn"
          onClick={() => {
            signInWithEmailAndPassword(auth, email, password);
            postEmail();

          }
          }
        >
          Login
        </button>
        {/* <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button> */}
        {/* <div className="login_font">
          <Link to="/reset">Forgot Password</Link>
        </div> */}
        <div className="login_font">
          Don’t have an account? <Link to="/register">Create Here</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;