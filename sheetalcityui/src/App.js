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
      setUserName(data);
      setIsLoggedIn(true);
    }else{
      alert("Invalid Credentials !! " + message);
    }
  };

  const handleLogout = () =>{
    setIsLoggedIn(false);
    setUserName("");
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
