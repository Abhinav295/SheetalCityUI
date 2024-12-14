import { useState } from "react";

function AddCity({onAddingCity}){
    const [cityName,setCityName]=useState("");
    const [cityMaintenancePerMonth,setCityMaintenancePerMonth] = useState(0);
    const [cityRsPerUnit,setCityRsPerUnit] = useState(0);

    const handleClose = (e)=>{
        e.preventDefault();
        onAddingCity("",false);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const bb = 'bb'
        try{
            const enCred = btoa(`${bb}:${bb}`);
            const loginData = {
                cityName:cityName,
                rsPerUnit:cityRsPerUnit,
                maintenancePerMonth:cityMaintenancePerMonth,
            }
            const response = await fetch("http://localhost:5000/sheetal.city/city/addCity",{
                method:"POST",
                headers:{
                    Authorization:`Basic ${enCred}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(loginData)
            });
            const data = await response.text();
            const message = await response.status;
            if(response.ok){
                onAddingCity(data,message);
            }else{
                onAddingCity("",message);
            }
        }catch(error){
            onAddingCity("",error);
        }
    };

    return (
    <div className="container">
        <div className="flex">
            <h4>Add City Details</h4>
            <button onClick={handleClose}>Close</button>
        </div>
        <div>
        <form onSubmit={handleSubmit}>
            <label>City Name</label>
            <input type="text" placeholder="Enter City Name" value={cityName} onChange={(e)=>setCityName(e.target.value)}></input>
            <label >Maintenance Per Month</label>
            <input  type="text" placeholder="Maintenance Per Month" value={cityMaintenancePerMonth} onChange={(e)=>setCityMaintenancePerMonth(e.target.value)}></input>
            <label >Electricity Per Unit</label>
            <input type="text" placeholder="Rs Per Unit " value={cityRsPerUnit} onChange={(e)=>setCityRsPerUnit(e.target.value)}></input>
            <br></br>
            <button type="submit">Add City Details</button>
        </form>
        </div>
    </div>
    );
}

export default AddCity;