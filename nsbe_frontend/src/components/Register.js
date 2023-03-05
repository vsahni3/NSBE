import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import "./Register.css";
import Logo from './img/Logo.png'
import SignupPic from './img/smilingBlack.png'

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
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

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password, picture);
    postEmail();
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/prompt");
  }, [user, loading]);

  return (
    <>
      {/* <img className="top_logo" src={Logo}></img> */}
      {/* <p className="top_title">BrutalityWatch</p> */}


      <div className="register">
        <div className="register__container">
        <img className="signup_pic" src={SignupPic}></img>
        <p className="title">Do you want to join?</p>

          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
          />
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
          {/* <input
            type="profile picture"
            className="register__textBox"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            placeholder="Profile Picture URL"
          /> */}
          <button className="register__btn" onClick={register}>
            Sign Up
          </button>
          {/* <button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            Register with Google
          </button> */}

          <div className="login_font">
            Already have an account? <Link to="/">Login Here</Link> 
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;