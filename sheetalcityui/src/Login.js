import './App.css';
import React, { useState } from "react";

function Login() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [usertype,setUsertype] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    console.log("printUserName");
  }
  function validateDetails(){
    return username.length>0 && password.length>0 && usertype.length>0 ;
  }
    return (
      <div className="App">
        <form className="form" onSubmit={handleSubmit}>
            <label className="lable" >Username</label>
            <input type="text" placeholder="Enter User Name" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            <label className="lable">Password</label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <br></br>
            <div>
            <input type="radio" id="user1" name="userType" value="User" onChange={(e)=>setUsertype(e.target.value)}></input>
            <label className="lable" for="user1"> I Am a User</label>
            <input type="radio" id="user2" name="userType" value="Employee"  onChange={(e)=>setUsertype(e.target.value)}></input>
            <label className="lable" for="user2"> I Am a Employee</label>
            <input type="radio" id="user3" name="userType" value="Admin"  onChange={(e)=>setUsertype(e.target.value)}></input>
            <label className="lable" for="user3"> I Am a Admin</label><br></br>
            </div>
            <button type="submit" disabled={!validateDetails()}>Sign In</button>
        </form>
      </div>
    );
  }
  
  export default Login;  