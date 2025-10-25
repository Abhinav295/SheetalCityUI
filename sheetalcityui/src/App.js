import logo from './logo.svg';
import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const[userName,setUserName] = useState("");
  const handleLogin = (data,message) =>{
    if(data!=""){
      setUserName(data['username']);
      localStorage.setItem("token",data['token']);

      setIsLoggedIn(true);
    }else{
      if(message==401){
        alert("Invalid Credentials !! Please try again");
      }else if(message==500){
        alert("Duplicate User !! Please use different username");
      }else if(message==404){
        alert("Service Not Found !! Please try again later");
      }else if(message==403){
        alert("Access Denied !! Please check your permissions");
      }else{
      alert(message);
    }
  }
  };

  const handleLogout = () =>{
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("token");
  };

  return (
    <div className='container'>
      <header className='flex-center'><h1>SHEETAL CITY UI</h1></header>
      {isLoggedIn?(<h3></h3>):(<h3>Login Page</h3>)}
      {isLoggedIn?(<Dashboard onLogout={handleLogout} userName={userName}/>):(<Login onLogin={handleLogin}/>)}
    </div>
  );
}

export default App;
