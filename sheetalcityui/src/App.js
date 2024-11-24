import logo from './logo.svg';
import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const handleLogin = (username,password,usertype) =>{
    const correctUserName = "Abhi";
    const correctPassword = "password123";

    if(username === correctUserName && password ===correctPassword){
      setIsLoggedIn(true);
    }else{
      alert("Invalid Credentials !!")
    }
  };

  const handleLogout = () =>{
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header><h1>Sheetal City UI</h1></header>
      {isLoggedIn?(<Dashboard onLogout={handleLogout}/>):(<Login onLogin={handleLogin}/>)}
    </div>
  );
}

export default App;
