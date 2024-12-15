import './Main.css'
import { useState, useEffect } from "react";

function AddAdvancePayment(){
    const [houseMappings,setHouseMappings] = useState([]);
    const [users,setUsers] = useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]= useState(null);
    const [searchQuery,setSearchQuery] = useState("");
    const [filterdItems,setFilterdItems] = useState([]);
    const [editingRow,setEditingRow] = useState(null);
    const [totalDueElectricity,setTotalDueElectricity] = useState(0);
    const [totalDueMaintenance,setTotalDueMaintenance] = useState(0);
    const [totalAdvanceElectric,setTotalAdvanceElectric] = useState(0);
    const [totalAdvanceMaintenance,setTotalAdvanceMaintenacne] = useState(0);
    const [advanceElecticyPayment,setAdvanceElectricPayment] = useState(0);
    const [advanceMaintenancePayment,setAdvanceMaintenancePayment] = useState(0);
    const [userId,setUserId] = useState(0);

    useEffect(()=>{
        const fetchData = async()=>{
            const bb = 'bb'
            const enCred = btoa(`${bb}:${bb}`);
            try{
                const response = await fetch("http://localhost:5000/sheetal.city/getAllUsers",{
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
                setUsers(data);
            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    const addDetails = (data)=> {
        if(data.length){
            var addTotalElectricity=0;
            var addTotalMaintenance = 0;
            data.map((houseMapping)=>{
                addTotalElectricity = houseMapping.dueElectric+addTotalElectricity;
                addTotalMaintenance = houseMapping.dueMaintenance+addTotalMaintenance;
        });
        setTotalDueElectricity(addTotalElectricity);
        setTotalDueMaintenance(addTotalMaintenance);
        }
    };

    const handlePay = async(event)=>{
        event.preventDefault();
        const bb = 'bb'
        try{
            const enCred = btoa(`${bb}:${bb}`);
            const loginData = {
                advanceElectricPayment:advanceElecticyPayment,
                advanceMaintenancePayment:advanceMaintenancePayment,
                userId:userId,
            }
            const response = await fetch("http://localhost:5000/sheetal.city/pay/advancePayment",{
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
                setError(data,message);
            }else{
                setError("",message);
            }
        }catch(error){
            setError("",error);
        }
    }

    const handlerUser = (e)=>{
        e.preventDefault();
        const value = e.target.value;
        const results = users.filter((user)=> user.username.toLowerCase().includes(value.toLowerCase()));
        const fetchData = async()=>{
            const bb = 'bb'
            const enCred = btoa(`${bb}:${bb}`);
            const id = results[0]["id"];
            try{
                const response = await fetch(`http://localhost:5000/sheetal.city/house/getRegisterdHouse/${id}`,{
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
                setHouseMappings(data);
                addDetails(data);
                setUserId(id);
            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            }
        }
        if(results.length){
            fetchData();
            setTotalAdvanceElectric(results[0]["advanceElectric"]);
            setTotalAdvanceMaintenacne(results[0]["advanceMaintenance"]);
        }
        if(value.toLowerCase().includes("select")){
            setHouseMappings([]);
            setTotalDueElectricity(0);
            setTotalDueMaintenance(0);
            setTotalAdvanceElectric(0);
            setTotalAdvanceMaintenacne(0);
            setUserId(0);
        }
    }

    return (<div class="form-container">
        Add AddAdvance Payment
        <form className="form-group" onSubmit={handlePay}>
            <label>Select User Name </label>
            <select onChange={handlerUser}>
                <option>Select User</option>
                {users.map((user)=>(
                    <option key={user.id}>{user.username}</option>
                ))}
            </select> 
            <table>
                <thead>
                    <th>City</th>
                    <th>House No</th>
                    <th>Due Electricity</th>
                    <th>Due Maintenance</th>
                </thead>
                <tbody>
                    {houseMappings.map((houseMapping)=>(
                        <tr key={houseMapping.id}>
                            <td>{houseMapping.cityDetails.cityName}</td>
                            <td>{houseMapping.houseNo}</td>
                            <td>{houseMapping.dueElectric}</td>
                            <td>{houseMapping.dueMaintenance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex'>
            <label>Total Due Maintenance</label>
            <p>{totalDueMaintenance}</p>
            </div>
            <div className='flex'>
            <label>Total Due Electricity</label>
            <p>{totalDueElectricity}</p>
            </div>
            <div className='flex'>
            <label>Total Due Amount</label>
            <p>{totalDueElectricity+totalDueMaintenance}</p></div>
            <br></br>
            <div className='flex'>
            <label>Total Advance Maintenance</label>
            <p>{totalAdvanceMaintenance}</p></div>
            <div className='flex'>
            <label>Total Advance Electricity</label>
            <p>{totalAdvanceElectric}</p></div>
            <div className='flex'>
            <label>Total Advance Amount</label>
            <p>{totalAdvanceElectric+totalAdvanceMaintenance}</p></div>
            <br></br>
            <div className='flex'>
            <label>Total Remaining Maintenance</label>
            <p>{totalAdvanceMaintenance-totalDueMaintenance}</p></div>
            <div className='flex'>
            <label>Total Remaining Electricity</label>
            <p>{totalAdvanceElectric-totalDueElectricity}</p></div>
            <div className='flex'>
            <label>Total Remaining Amount</label>
            <p>{totalAdvanceElectric+totalAdvanceMaintenance-totalDueElectricity-totalDueMaintenance}</p></div>
            <br></br>
            <div className='flex'>
            <label>Advance Electricity Payment</label>
            <input type="number" onChange={(e)=>{setAdvanceElectricPayment(e.target.value)}}></input></div>
            <div className='flex'>
            <label>Advance Maintenance Payment</label>
            <input type="number" onChange={(e) => {setAdvanceMaintenancePayment(e.target.value)}}></input>
            </div>
            <div className='flex'>
            <label>Total Payment</label>
            <input type="number" value={(Number(advanceElecticyPayment)+Number(advanceMaintenancePayment))}></input>
            </div>
            <button type="submit">Pay</button>
        </form>
    </div>);
}

export default AddAdvancePayment;