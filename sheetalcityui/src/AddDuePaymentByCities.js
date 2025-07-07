function AddDuePaymentByCities(){
    const handleClick = () => {
        const result = window.confirm("Are you sure you want to generate due payment for City?");
        if(result){
            alert("Generating due payment for City...");
        } else {
            alert("Due payment generation cancelled.");
        }
    };
    return(
        <div onClick={handleClick}>Generate Due Payment City Wise</div>
    );
}

export default AddDuePaymentByCities;