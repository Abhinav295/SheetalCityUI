import React from 'react';

function AddDuePayment(){
const handleClick = () => {
    const result = window.confirm("Are you sure you want to generate due payment for all cities?");
    if(result){
        alert("Generating due payment for all cities...");
    } else {
        alert("Due payment generation cancelled.");
    }
};
    return(
    <div onClick={handleClick}>Generate Due Payment For All Cities</div>
);
}

export default AddDuePayment;