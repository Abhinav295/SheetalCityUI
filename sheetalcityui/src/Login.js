import './Login.css';
import { BASE_URL } from './Config';
import React, { useState } from "react";

function Login({onLogin}) {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [usertype,setUsertype] = useState("");
  const [logintype,setLogintype] = useState(true);

  const handleSubmit = async(event)=> {
    event.preventDefault();
    try{
      const loginData = {
        username:username,
        password:password,
        userType:usertype
      }
      if(logintype){
      const response = await fetch(`${BASE_URL}/sheetal.city/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
      });
      
      if(response.ok){
        const data = await response.json();
        const message = await response.status;
      onLogin(data,message);
      }else{
        const message = await response.status;
        onLogin("",message);
      }
    }else{
      const response = await fetch(`${BASE_URL}/sheetal.city/auth/signup`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
      });
      if(response.ok){
        const data = await response.json();
        const message = await response.status;
      onLogin(data,message);
      }else{
        const message = await response.status;
        onLogin("",message);
      }
    }
    }catch(error){
      console.error("Error During Login",error);
      onLogin("",error);
    }
  };
  function validateLogin(){
    if(logintype){
      return "SignIn";
    }else {
      return "SignUp";
    }
  }
  function validateDetails(){
    return username.length>0 && password.length>0 && usertype.length>0 ;
  }
    return (
      <div className="login-card">
        <div className="logo">L</div>
        <h1>WELCOME IN SHEETAL CITY</h1>
        <p className="subtitle">Please Login to Your Account</p>
        <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required></input>
            </div>
            <div className='input-group'>
              <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
            </div>
            <br></br>
            <div className='options'>
            <input type="radio" id="user" name="userType" value="User" onChange={(e)=>setUsertype(e.target.value)}></input>
            <label for="user">User</label>
            <input type="radio" id="employee" name="userType" value="Employee"  onChange={(e)=>setUsertype(e.target.value)}></input>
            <label for="employee">Employee</label>
            <input type="radio" id="admin" name="userType" value="Admin"  onChange={(e)=>setUsertype(e.target.value)}></input>
            <label for="admin">Admin</label>
            </div>
            <button type="submit" className="login-btn" disabled={!validateDetails()}>{validateLogin()}</button>
            <button type="button" className="login-btn" onClick={(e)=>setLogintype(!logintype)}>click Here for {!logintype?"Sign In":"Sign Up"}</button>
        </form>
      </div>
    );
  }
  
  export default Login;  