import './App.css';
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
      const response = await fetch("http://localhost:5000/sheetal.city/auth/login",{
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
      const response = await fetch("http://localhost:5000/sheetal.city/auth/signup",{
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
      <div className="card">
        <form onSubmit={handleSubmit}>
            <label >Username</label>
            <input type="text" placeholder="Enter User Name" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            <label >Password</label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <br></br>
            <div className='flex-center'>
            <input type="radio" id="user" name="userType" value="User" onChange={(e)=>setUsertype(e.target.value)}></input>
            <label for="user"> I Am a User</label>
            <input type="radio" id="employee" name="userType" value="Employee"  onChange={(e)=>setUsertype(e.target.value)}></input>
            <label for="employee"> I Am a Employee</label>
            <input type="radio" id="admin" name="userType" value="Admin"  onChange={(e)=>setUsertype(e.target.value)}></input>
            <label for="admin"> I Am a Admin</label><br></br>
            </div>
            <button type="submit" disabled={!validateDetails()}>{validateLogin()}</button>
            <button type="button" onClick={(e)=>setLogintype(!logintype)}>click Here for {!logintype?"Sign In":"Sign Up"}</button>
        </form>
      </div>
    );
  }
  
  export default Login;  