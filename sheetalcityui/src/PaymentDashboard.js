import { useState } from "react";
import AddAdvancePayment from "./AddAdvancePayment";
import AddDuePayment from "./AddDuePayment";

function PaymentDashboard({onClose}){

    const [isAddAdvancePaymentActive,setIsAddAdvancePaymentActive] = useState(false);

    return (
    <div className="card">
        <h3>Welcome to the Payment Operations Dashboard</h3>
        <button onClick={onClose}>Close</button>
        <div className="card">
            {isAddAdvancePaymentActive?(<AddAdvancePayment/>):(<div onClick={(e)=>{setIsAddAdvancePaymentActive(true)}}>Adavance Payment</div>)}
        </div>
        <div className="card"><AddDuePayment/></div>
    </div>);
}

export default PaymentDashboard;