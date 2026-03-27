import { useState } from "react";
import AddAdvancePayment from "./AddAdvancePayment";
import AddDuePayment from "./AddDuePayment";
import AddDuePaymentByCustomer from "./AddDuePaymentByCustomer";
import AddDuePaymentByCities from "./AddDuePaymentByCities";

function PaymentDashboard({onClose}){

    const [isAddAdvancePaymentActive,setIsAddAdvancePaymentActive] = useState(false);
    const [isShowAddDueForAllCustomersActive,setIsShowAddDueForAllCustomersActive] = useState(false);
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

    const handleDueForAllCust = () =>{
        setIsShowAddDueForAllCustomersActive(false);
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
        <div className="card"><AddDuePaymentByCities/></div>
        <div className="card">
        {isShowAddDueForAllCustomersActive?(<AddDuePaymentByCustomer onAddDue = {handleDueForAllCust}/>):(<div onClick={(e)=>{setIsShowAddDueForAllCustomersActive(true)}}>Generate Due Payment For All Customers</div>)}
        </div>
    </div>
    </div>);
}

export default PaymentDashboard;