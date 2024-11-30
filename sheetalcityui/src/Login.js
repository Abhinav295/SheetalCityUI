import './App.css';
import React, { useState } from "react";

function Login({onLogin}) {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [usertype,setUsertype] = useState("");
  const [logintype,setLogintype] = useState(true);

  const handleSubmit = async(event)=> {
    event.preventDefault();
    const bb = 'bb'
    try{
      const enCred = btoa(`${bb}:${bb}`);
      const loginData = {
        username:username,
        password:password,
        type:usertype
      }
      if(logintype){
      const response = await fetch("http://localhost:5000/sheetal.city/login",{
        method:"POST",
        headers:{
          Authorization:`Basic ${enCred}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
      });
      const data = await response.text();
      const message = await response.status;
      if(response.ok){
      onLogin(data,message);
      }else{
        onLogin("",message);
      }
    }else{
      const response = await fetch("http://localhost:5000/sheetal.city/signup",{
        method:"POST",
        headers:{
          Authorization:`Basic ${enCred}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
      });
      const data = await response.text();
      const message = await response.status;
      if(response.ok){
      onLogin(data,message);
      }else{
        onLogin("",message);
      }
      onLogin(data,message);
      console.log("You are doing sign up");
    }
    }catch(error){
      console.error("Error During Login",error);
      onLogin("");
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
      <div className="Lform-container">
        <form className="Lform" onSubmit={handleSubmit}>
            <label className="lable" >Username</label>
            <input className="input-group" type="text" placeholder="Enter User Name" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            <label className="lable">Password</label>
            <input className="input-group" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <br></br>
            <div>
            <input className="input-group" type="radio" id="user1" name="userType" value="User" onChange={(e)=>setUsertype(e.target.value)}></input>
            <label className="lable" for="user1"> I Am a User</label>
            <input  className="input-group"type="radio" id="user2" name="userType" value="Employee"  onChange={(e)=>setUsertype(e.target.value)}></input>
            <label className="lable" for="user2"> I Am a Employee</label>
            <input className="input-group" type="radio" id="user3" name="userType" value="Admin"  onChange={(e)=>setUsertype(e.target.value)}></input>
            <label className="lable" for="user3"> I Am a Admin</label><br></br>
            </div>
            <button type="submit" disabled={!validateDetails()}>{validateLogin()}</button>
            <button type="button" onClick={(e)=>setLogintype(!logintype)}>click Here for SignUp</button>
        </form>
      </div>
    );
  }
  
  export default Login;  