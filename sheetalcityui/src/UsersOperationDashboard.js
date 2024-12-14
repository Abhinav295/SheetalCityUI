import React, { useEffect, useState } from "react";
import './App.css';
import AddUserDetails from "./AddUserDetails";
import ShowUserDetails from "./ShowUserDetails";
import ShowCityDetails from "./ShowCityDetails";
import AddCity from "./AddCity";
import AddHouseDetails from "./AddHouseDetails";
import ShowHouseDetails from "./ShowHouseDetails";

function UsersOperationDashboard({onClose}){

    const [showMessage,setShowMessage] = useState(false);
    const [isAddActive,setIsAddActive] = useState(false);
    const [isShowActive,setIsShowActive] = useState(false);
    const [isAddCityActive,setIsAddCityActive] = useState(false);
    const [isShowCityActive,setIsShowCityActive] = useState(false);
    const [isAddHouseDetailsActive,setIsAddHouseDetailsActive] = useState(false);
    const [isShowHouseDetailsActive,setIsShowHouseDetailsActive] = useState(false);
    const [messages,setMessages ] = useState("");
    
    const handleUserDetails = (data,message)=>{
        if(message){
            if(data){
                showMessages(`User is Created Successfully Username ${data}`);
                setIsAddActive(false);
            }else {
                setIsAddActive(false);
                showMessages(`User is Facing Some Problem while Creation Error Response ${message}`);
            }
        }else{
            showMessages("Tab Is Closed Successfully");
            setIsAddActive(false);  
        }
    }
    
    const handleShowUserDetails = (message)=>{
        if(!message){
            showMessages("Tab Is Closed Successfully");
            setIsShowActive(false);
        }
    }
    
    const handleCityDetails = (data,message) => {
        if(message){
            if(data){
                showMessages(`City is Created Successfully Username ${data}`);
                setIsAddCityActive(false);
            }else {
                setIsAddCityActive(false);
                showMessages(`City is Facing Some Problem while Creation Error Response ${message}`);
            }
        }else{
            showMessages("Tab Is Closed Successfully");
            setIsAddCityActive(false);  
        }
    }
    
    const handleShowCtiyDetails = (messages) =>{
        if(!messages){
            showMessages("Tab Is Closed Successfully");
            setIsShowCityActive(false);
        }
    }
    
    const handleHouseMapping = (data,message)=>{
        if(message){
            if(data){
                showMessages(`User is Registeed Successfully With House No ${data}`);
                setIsAddHouseDetailsActive(false);
            }else {
                setIsAddHouseDetailsActive(false);
                showMessages(`There is some problem while Registration ${message}`);
            }
        }else{
            showMessages("Tab Is Closed Successfully");
            setIsAddHouseDetailsActive(false);  
        }
    }
    
    
    function showMessages(message){
        setShowMessage(true);
        setMessages(message);
            setTimeout(()=>{setShowMessage(false);setMessages("");},3000);
    }
    
    
    
    function addUserActive(){
        setIsAddActive(true);
        setIsShowActive(false);
        setIsAddCityActive(false);
        setIsShowCityActive(false);
        setIsAddHouseDetailsActive(false);
        setIsShowHouseDetailsActive(false);
        
    }
    
    function showUserActive(){
        setIsShowActive(true);
        setIsAddActive(false);
        setIsAddCityActive(false);
        setIsShowCityActive(false);
        setIsAddHouseDetailsActive(false);
        setIsShowHouseDetailsActive(false);
       
    }
    function addCityActive(){
        setIsAddCityActive(true);
        setIsAddActive(false);
        setIsShowActive(false);
        setIsShowCityActive(false);
        setIsAddHouseDetailsActive(false);
        setIsShowHouseDetailsActive(false);
    }
    function showCityActive(){
        setIsShowCityActive(true);
        setIsAddActive(false);
        setIsShowActive(false);
        setIsAddCityActive(false);
        setIsAddHouseDetailsActive(false);
        setIsShowHouseDetailsActive(false);
       
    }
    
    function addHouseActive(){
        setIsAddHouseDetailsActive(true);
        setIsAddActive(false);
        setIsShowActive(false);
        setIsAddCityActive(false);
        setIsShowCityActive(false);
        setIsShowHouseDetailsActive(false);
    }
    
    function showHouseActive(){
        setIsShowHouseDetailsActive(true);
        setIsAddActive(false);
        setIsShowActive(false);
        setIsAddCityActive(false);
        setIsShowCityActive(false);
        setIsAddHouseDetailsActive(false);
    }
    

    return (
        <div className="card">
        <div className="container">
            <div className="flex">
            <h3>Welcome to the User Operations Dashboard</h3>
            <button onClick={onClose}>Close</button></div>
            {showMessage?(<p>{messages}</p>):(<p></p>)}
            <div className="card">
            {isAddActive?(<AddUserDetails onAddingUser = {handleUserDetails}/>):(<div className="card" onClick={addUserActive}>Add Users Details</div>)}
            {isShowActive?(<ShowUserDetails onShowUser = {handleShowUserDetails}/>):(<div className="card" onClick={showUserActive}>Show User Details</div>)}
            </div>
            <div className="card">
            {isAddCityActive?(<AddCity onAddingCity = {handleCityDetails}/>):(<div className="card" onClick={addCityActive}>Add City Details</div>)}
            {isShowCityActive?(<ShowCityDetails onShowingCity = {handleShowCtiyDetails}/>):(<div className="card" onClick={showCityActive}>Show City Details</div>)}
            </div>
            <div className="card">
            {isAddHouseDetailsActive?(<AddHouseDetails onAddingHouseMapping = {handleHouseMapping}/>):(<div className="card" onClick={addHouseActive} >Add House Details</div>)}
            {isShowHouseDetailsActive?(<ShowHouseDetails></ShowHouseDetails>):(<div className="card" onClick={showHouseActive} >Show House Details</div>)}
            </div>
        </div>
        </div>
        );
}

export default UsersOperationDashboard;