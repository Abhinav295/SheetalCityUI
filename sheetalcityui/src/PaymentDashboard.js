import { useState } from "react";
import AddAdvancePayment from "./AddAdvancePayment";
import AddDuePayment from "./AddDuePayment";

function PaymentDashboard({onClose}){

    const [isAddAdvancePaymentActive,setIsAddAdvancePaymentActive] = useState(false);
    const [showMessage,setShowMessage] = useState(false);
    const [messages,setMessages ] = useState("");

    const handlePayment =(data,message) =>{
        if(data){
            showMessages(`Payment is Done Successfully ${data}`);
        }else{
            showMessages(`Payment is unsuccessfull ${message}`)
        }
        setIsAddAdvancePaymentActive(false);
    }

    function showMessages(message){
        setShowMessage(true);
        setMessages(message);
            setTimeout(()=>{setShowMessage(false);setMessages("");},3000);
    }

    return (
    <div className="card">
        <div className="container">
        <div className="flex"><h3>Welcome to the Payment Operations Dashboard</h3>
        <button onClick={onClose}>Close</button>
        </div>
        {showMessage?(<p>{messages}</p>):(<p></p>)}
        <div className="card">
            {isAddAdvancePaymentActive?(<AddAdvancePayment onAddPayment = {handlePayment}/>):(<div onClick={(e)=>{setIsAddAdvancePaymentActive(true)}}>Adavance Payment</div>)}
        </div>
        <div className="card"><AddDuePayment/></div>
    </div>
    </div>);
}

export default PaymentDashboard;