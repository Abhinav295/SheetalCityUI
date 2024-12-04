import { useEffect, useState } from "react";

function AddHouseDetails({onAddingHouseMapping}){
    const [usersList,setUserList] = useState([]);
    const [cityList,setCityList] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState(null);
    const [city,setCity] = useState(null);
    const [block,setBlock] = useState(null);
    const [houseNo,setHouseNo] = useState(null);
    const [dueElectric,setDueElectric] = useState(0);
    const [dueMaintenance,setDueMaintenance] = useState(0);

    useEffect(()=>{
        const bb = 'bb'
        const enCred = btoa(`${bb}:${bb}`);
        const fetchData = async()=>{
            try{
            const responseCities =  await fetch("http://localhost:5000/sheetal.city/city/getAllCities",{
            method:"GET",
            headers:{
                Authorization:`Basic ${enCred}`,
                "Content-Type":"application/json"
            },
        });

        const responseUsers =  await fetch("http://localhost:5000/sheetal.city/getAllUsers",{
            method:"GET",
            headers:{
                Authorization:`Basic ${enCred}`,
                "Content-Type":"application/json"
            },
        });

        if(!responseCities.ok){
            throw new Error("faield to fetch data");
        }
        if(!responseUsers.ok){
            throw new Error("faield to fetch data");
        }
        const citiesData = await responseCities.json();
        setCityList(citiesData);

        const userData = await responseUsers.json();
        setUserList(userData);
    }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };
    fetchData()
    },[]);

    const handleUser = (e)=>{
        e.preventDefault();
        const value = e.target.value;
        const results = usersList.filter((user)=> user.username.toLowerCase().includes(value.toLowerCase()));
        setUser(results);
    }

    const handleCity = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const results = cityList.filter((city)=> city.cityName.toLowerCase().includes(value.toLowerCase()));
        setCity(results);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const bb = 'bb'
        try{
            const enCred = btoa(`${bb}:${bb}`);
            const houseMapping = {
                block:block,
                houseNo:houseNo,
                cityDetails:city,
                userDetails:user,
                dueElectric:dueElectric,
                dueMaintenance:dueMaintenance,
            }
            console.log(JSON.stringify(houseMapping));
            const response = await fetch("http://localhost:5000/sheetal.city/house/RegisterHouse",{
                method:"POST",
                headers:{
                    Authorization:`Basic ${enCred}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(houseMapping),
            });
            const data = await response.text();
            const message = await response.status;
            if(response.ok){
                onAddingHouseMapping(data,message);
            }else{
                onAddingHouseMapping("",message);
            }
        }catch(error){
            onAddingHouseMapping("",error);
            console.error(error);
        }
    }

    const handleClose = (e)=>{
        e.preventDefault();
        onAddingHouseMapping("",false);
    }

    return (
        <div className="form-container">
            <h4>Add House Details</h4>
            <div className="Logout" ><button onClick={handleClose}>Close</button></div>
            <form className="form-group" onSubmit={handleSubmit}>
            <select onChange={handleCity}>
            <option>Select User City</option>
                {cityList.map((city)=>(
                    <option key={city.id}>{city.cityName}</option>
                ))}
            </select>
            <select onChange={handleUser}>
                <option>Select User Name</option>
                {usersList.map((user)=>(
                    <option key={user.id}>{user.username}</option>
                ))}
            </select>
            <select onChange={(e)=>{setBlock(e.target.value)}}>
            <option>Select Block</option>
                <option>Block A</option>
                <option>Block B</option>
                <option>Block C</option>
                <option>Block D</option>
            </select>
            <label>Enter Houser Number </label>
            <input type="text" placeholder="Enter House Number"  value={houseNo} onChange={(e)=>{setHouseNo(e.target.value)}}></input>
            <label>Enter Due Electricity Bill </label>
            <input type="text" placeholder="Enter Due Electricity Bill" value={dueElectric} onChange={(e)=>{setDueElectric(e.target.value)}}></input>
            <label>Enter Due Maintenance Bill</label>
            <input type="text" placeholder="Enter Due Maintenance Bill" value={dueMaintenance} onChange={(e)=>{setDueMaintenance(e.target.value)}}></input>
            <button type="submit">Add Details</button>
            </form>
        </div>
    );
}

export default AddHouseDetails;