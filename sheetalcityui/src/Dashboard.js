import React, { useEffect, useState } from "react";
import './App.css';
import UsersOperationDashboard from "./UsersOperationDashboard";
import PaymentDashboard from "./PaymentDashboard";

function Dashboard({onLogout,userName}){
const [showMessage,setShowMessage] = useState(false);
const [messages,setMessages ] = useState("");
const [isUserOperationActive,setIsUserOperationActive] = useState(false);
const [isPaymentActive,setIsPaymentActive] = useState(false);

useEffect(()=>{
    showMessages("You are successfully logged in!")
},[]);

const handleUserOperation = (data,messages)=>{
    if(!messages){
        showMessages("Tab Is Closed Successfully");
        setIsUserOperationActive(false);
    }
};

const handlePaymentOperation = (data,messages)=>{
    if(!messages){
        showMessages("Tab Is Closed Successfully");
        setIsPaymentActive(false);
    }
}

function showMessages(message){
    setShowMessage(true);
    setMessages(message);
        setTimeout(()=>{setShowMessage(false);setMessages("");},3000);
}

function userOperationActive(){
    setIsUserOperationActive(true);
}

function paymentOperationActive(){
    setIsPaymentActive(true);
}

return(
    <div>
        <h1 className="flex-center">Welcome to the Dashboard</h1>
        <div className="flex"><h3>Welcome {userName}</h3>
        <button onClick={onLogout}>Logout</button></div>
        {showMessage?(<p>{messages}</p>):(<p></p>)}
        <div className="container">
        {isUserOperationActive?(<UsersOperationDashboard onClose = {handleUserOperation}/>):(<div className="card" onClick={userOperationActive}>User Operations Dashboard</div>)}
        {isPaymentActive?(<PaymentDashboard onClose={handlePaymentOperation}/>):(<div className="card" onClick={paymentOperationActive}>Payment Operations Dashboard</div>)}
        </div>
    </div>
)
}
export default Dashboard;
