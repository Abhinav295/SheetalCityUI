import React, { useState } from "react";
import './App.css';
import AddUserDetails from "./AddUserDetails";
import ShowUserDetails from "./ShowUserDetails";
import AddCity from "./AddCity";

function Dashboard({onLogout,userName}){
const [showMessage,setShowMessage] = useState(false);
const [isAddActive,setIsAddActive] = useState(false);
const [isShowActive,setIsShowActive] = useState(false);
const [isAddCityActive,setIsAddCityActive] = useState(false);
const [messages,setMessages ] = useState("");
const handleUserDetails = (data,message)=>{
    if(data){
        setIsAddActive(false);
        showMessages(`User is Created Successfully Username ${data}`);
    }else {
        setIsAddActive(false);
        showMessages(`User is Facing Some Problem while Creation ${message}`);
    }
}
function showMessages(message){
    setShowMessage(true);
    setMessages(message);
        setTimeout(()=>{setShowMessage(false);setMessages("");},3000);
}
const showUserDetails = (message)=>{
    if(message){
        setIsShowActive(true);
    }else{
        setIsShowActive(false);
    }
}

const handleCityDetails = (data,message) => {
    if(data){
        setIsAddCityActive(false);
        showMessages(`City is Created Successfully Username ${data}`);
    }else {
        setIsAddCityActive(false);
        showMessages(`City is Facing Some Problem while Creation ${message}`);
    }
}

function addUserActive(){
    setIsAddActive(true);
    setIsShowActive(false);
}

function showUserActive(){
    setIsShowActive(true);
    setIsAddActive(false);
}
function addCityActive(){
    setIsAddCityActive(true);
    setIsAddActive(false);
    setIsShowActive(false);
}


return(
    <div>
        <h1>Welcome to the Dashboard</h1>
        <p>You are successfully logged in!</p>
        <h3>Welcome {userName}</h3>
        <button onClick={onLogout}>Logout</button>
        {showMessage?(<h4>{messages}</h4>):(<p></p>)}
        <div className="cards">
            {isAddActive?(<AddUserDetails onAddingUser = {handleUserDetails}/>):(<div className="cardsDiv" onClick={addUserActive}>Add Users Details</div>)}
            {isShowActive?(<ShowUserDetails onShowUser = {showUserDetails}/>):(<div className="cardsDiv" onClick={showUserActive}>Show User Details</div>)}
        </div>
        <div className="cards">
            {isAddCityActive?(<AddCity onAddingCity = {handleCityDetails}/>):(<div className="cardsDiv" onClick={addCityActive}>Add City Details</div>)}
        </div>
    </div>
)
}
export default Dashboard;
