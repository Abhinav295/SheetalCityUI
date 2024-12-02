import { useState, useEffect } from "react";


function ShowUserDetails({onShowingCity}){
    const [cities,setCities] = useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]= useState(null);
    const [editingRow,setEditingRow] = useState(null);

    useEffect(()=>{
        const bb = 'bb'
        const enCred = btoa(`${bb}:${bb}`);
        const fetchData = async()=>{
            try{
            const response =  await fetch("http://localhost:5000/sheetal.city/city/getAllCities",{
            method:"GET",
            headers:{
                Authorization:`Basic ${enCred}`,
                "Content-Type":"application/json"
            },
        });
        if(!response.ok){
            throw new Error("faield to fetch data");
        }
        const data = await response.json();
        setCities(data);
    }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };
    fetchData()
    },[]);

    const handleClose = (e)=>{
        e.preventDefault();
        onShowingCity(false);
    };

    const handleEdit = (index) =>{
        setEditingRow(index);
    };

    const handleSave = async (index) => {
        try{
            const bb = 'bb'
            const enCred = btoa(`${bb}:${bb}`);
            const updateCities = cities[index];
            const response = await fetch("http://localhost:5000/sheetal.city/city/updateCity",{
            method:"PUT",
            headers:{
                Authorization:`Basic ${enCred}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updateCities)
        });
            if(response.ok){
                setEditingRow(false);
            }
        }catch (error){
            console.error("Error Updating Entry");
            alert("failed to update the entry");
        }
    }
    const handleChange = (index,field,value)=>{
        const updateCities = [...cities];
        updateCities[index][field] = value;
        setCities(updateCities);
    };


    return (
        <div>
            {loading?(<p>Loading .... </p>):(<p></p>)}
            {error?(<p>{error}</p>):(<p></p>)}
            <h4>Show User Details</h4>
            <table>
                <thead>
                    <th>City Name</th>
                    <th>Maintenance Per Month</th>
                    <th>Electric Rate Per Unit</th>
                </thead>
                <tbody>
                {cities.map((city,index)=>(
                    <tr key={city.id}>
                        <td>{city.cityName}</td>
                        <td>{editingRow===index?(<input value={city.maintenancePerMonth} onChange={(e)=>handleChange(index,"maintenancePerMonth",e.target.value)}></input>):(<input value={city.maintenancePerMonth}></input>)}</td>
                        <td>{editingRow===index?(<input value={city.rsPerUnit} onChange={(e)=>handleChange(index,"rsPerUnit",e.target.value)}></input>):(<input value={city.rsPerUnit   }></input>)}</td>
                        <td>{editingRow===index?(<button onClick={()=>handleSave(index)}>Save</button>):(<button onClick={()=>handleEdit(index)}>Edit</button>)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="form-group"><button onClick={handleClose}>Close</button></div>
        </div>
    );
}

export default ShowUserDetails;