import React, { useState } from "react";
import './App.css';
import AddUserDetails from "./AddUserDetails";
import ShowUserDetails from "./ShowUserDetails";

function Dashboard({onLogout,userName}){
const [userdetail,setUserdetail] = useState("");
const [isAddActive,setIsAddActive] = useState(false);
const [isShowActive,setIsShowActive] = useState(false);
const handleUserDetails = (data,message)=>{
    setUserdetail(data);
    if(data){
        console.log("We are good");
        setIsAddActive(false);
    }else {
        console.log(message);
        setIsAddActive(false);
    }
}
const showUserDetails = (message)=>{
    if(message){
        setIsShowActive(true);
    }else{
        setIsShowActive(false);
    }
}
function addUserActive(){
    setIsAddActive(true);
}
function showUserActive(){
    setIsShowActive(true);
}


return(
    <div>
        <h1>Welcome to the Dashboard</h1>
        <p>You are successfully logged in!</p>
        <h3>Welcome {userName}</h3>
        <button onClick={onLogout}>Logout</button>
        <div className="cards">
            {isAddActive?(<AddUserDetails onAddingUser = {handleUserDetails}/>):(<div className="cardsDiv" onClick={addUserActive}>Add Users Details</div>)}
            {isShowActive?(<ShowUserDetails onShowUser = {showUserDetails}/>):(<div className="cardsDiv" onClick={showUserActive}>Show User Details</div>)}
            <div className="cardsDiv" onClick={(e)=>{e.preventDefault();console.log("Delete User Details")}}>Delete User Details</div>
        </div>
    </div>
)
}
export default Dashboard;
