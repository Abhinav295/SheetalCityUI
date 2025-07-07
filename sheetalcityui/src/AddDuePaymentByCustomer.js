import React from 'react'; 
function AddDuePaymentByCustomer(){
const handleClick = () => {
    const result = window.confirm("Are you sure you want to generate due payment for all customers?");
    if(result){
        alert("Generating due payment for all customers...");
    } else {
        alert("Due payment generation cancelled.");
    }
};
    return(
    <div onClick={handleClick}>Generate Due Payment For All Customers</div>
);
}

export default AddDuePaymentByCustomer;