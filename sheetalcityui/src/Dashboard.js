import React, { useState } from "react";
import './App.css';
import AddUserDetails from "./AddUserDetails";

function Dashboard({onLogout,userName}){
const [userdetail,setUserdetail] = useState("");
const [isAddActive,setIsAddActive] = useState(false);
const handleUserDetails = (data,message)=>{
    setUserdetail(data);
    if(data){
        console.log("We are good");
    }else {
        console.log(message)
        setIsAddActive(false);
    }
}
function addUserActive(){
    setIsAddActive(true);
}


return(
    <div>
        <h1>Welcome to the Dashboard</h1>
        <p>You are successfully logged in!</p>
        <h3>Welcome {userName}</h3>
        <button onClick={onLogout}>Logout</button>
        <div className="cards">
            {isAddActive?(<AddUserDetails onAddingUser = {handleUserDetails}/>):(<div onClick={addUserActive}>Add Users Details</div>)}
            <div onClick={(e)=>{e.preventDefault();console.log("Show Users List")}}>Show Users List</div>
            <div onClick={(e)=>{e.preventDefault();console.log("Delete User Details")}}>Delete User Details</div>
        </div>
    </div>
)
}
export default Dashboard;
