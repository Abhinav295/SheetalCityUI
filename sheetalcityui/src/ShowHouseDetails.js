import { useState, useEffect } from "react";

function ShowHouseDetails(){
    const [houseMapping,setHouseMapping] = useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]= useState(null);
    const [searchQuery,setSearchQuery] = useState("");
    const [filterdItems,setFilterdItems] = useState([]);
    const [editingRow,setEditingRow] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            const bb = 'bb'
            const enCred = btoa(`${bb}:${bb}`);
            try{
                const response = await fetch("http://localhost:5000/sheetal.city/house/getAllRegisterdHouse",{
            method:"GET",
            headers:{
                Authorization:`Basic ${enCred}`,
                "Content-Type":"application/json"
            },
        });
                if(!response.ok){
                    throw Error(`failed to fetch data ${response.status}`)
                }
                const data = await response.json();
                setHouseMapping(data);
                setFilterdItems(data);
            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    return (
        <div>
            {loading?(<p>Loading .... </p>):(<p></p>)}
            {error?(<p>{error}</p>):(<p></p>)}
            <h4>Show Registered House</h4>
            <input className="search-box" type='text' placeholder="Search Here" name="searchBox" onChange={(e)=>{setSearchQuery(e.target.value)}}></input>
            <table>
                <thead>
                    <th>CITY</th>
                    <th>BLOCK</th>
                    <th>HOUSE NO</th>
                    <th>USER NAME</th>
                    <th>DUE MAINTENANCE</th>
                    <th>DUE ELECTRIC</th>
                </thead>
                <tbody>
                {filterdItems.map((registeredHouse,index)=>(
                    <tr key={registeredHouse.id}>
                        <td>{registeredHouse.cityDetails.cityName}</td>
                        <td>{registeredHouse.block}</td>
                        <td>{registeredHouse.houseNo}</td>
                        <td>{registeredHouse.userDetails.username}</td>
                        <td>{registeredHouse.dueMaintenance}</td>
                        <td>{registeredHouse.dueElectric}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default ShowHouseDetails;