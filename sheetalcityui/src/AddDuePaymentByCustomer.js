import React from 'react'; 
import { BASE_URL } from './Config';
import { useState } from "react";
function AddDuePaymentByCustomer({onAddDue}){
    const [dialogVisible, setDialogVisible] = useState(true);
    const [averageUnits, setAverageUnits] = useState(0);


const handleClose = (e)=>{
    e.preventDefault();
    setDialogVisible(false);
    onAddDue();
}
const handleGenerate = async(e) =>{
    e.preventDefault();
        const token = localStorage.getItem("token");
        try{
            const response = await fetch(`${BASE_URL}/sheetal.city/pay/generateDueForAllCustomers?averageUnits=`+averageUnits,{
                method:"POST",
                headers:{
                    Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            },
        });
    }catch(err){
        console.log("Error while generating due for all customers",err);
    }

    setDialogVisible(false);
    onAddDue();
};
    return(
    <div>
    <div className="flex"><h4>Generate Due Payment For All Customers</h4>
    <button onClick={handleClose}>Close</button></div>
    {dialogVisible?(<div className="container"><b>Select the Average Units For Customers</b>
    <input type="number" placeholder="Enter Average Units" onChange={(e)=>{setAverageUnits(e.target.value)}}></input>
    <button onClick={handleGenerate}>Generate</button>
    </div>):null}
    </div>
);
}

export default AddDuePaymentByCustomer;