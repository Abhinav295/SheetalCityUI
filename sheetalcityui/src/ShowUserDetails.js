import React, { useState,useEffect } from "react";
import './App.css';

function ShowUserDetails({onShowUser}){
    const [users,setUsers] = useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]= useState(null);
    const [searchQuery,setSearchQuery] = useState("");
    const [filterdItems,setFilterdItems] = useState([]);
    const [editingRow,setEditingRow] = useState(null);

    useEffect(()=>{
        const bb = 'bb'
        const enCred = btoa(`${bb}:${bb}`);
        const fetchData = async()=>{
            try{
            const response =  await fetch("http://localhost:5000/sheetal.city/getAllUsers",{
            method:"GET",
            headers:{
                Authorization:`Basic ${enCred}`,
                "Content-Type":"application/json"
            },
        });
        if(!response.ok){
            throw new Error(`faield to fetch data ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        setFilterdItems(users);
    }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };
    fetchData()
    },[]);

    useEffect(()=>{
        const results = users.filter((user)=> user.firstName.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilterdItems(results);
    },[searchQuery,users]);

    const handleClose = (e)=>{
        e.preventDefault();
        onShowUser(false);
    }

    const handleEdit = (index) =>{
        setEditingRow(index);
    };

    const handleSave = async (index) => {
        try{
            const bb = 'bb'
            const enCred = btoa(`${bb}:${bb}`);
            const updateusers = users[index];
            const response = await fetch(`http://localhost:5000/sheetal.city/updateUser/${updateusers.id}`,{
            method:"PUT",
            headers:{
                Authorization:`Basic ${enCred}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updateusers)
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
        const updateusers = [...users];
        updateusers[index][field] = value;
        setUsers(updateusers);
    };

    async function handleRemove(i){
        try{
            const bb = 'bb'
            const enCred = btoa(`${bb}:${bb}`);
            const response =  await fetch(`http://localhost:5000/sheetal.city/deleteUser/${i}`,{
            method:"DELETE",
            headers:{
                Authorization:`Basic ${enCred}`,
                "Content-Type":"application/json"
            },
        });
        if(!response.ok){
            throw new Error("faield to fetch data");
        }
        const data =  await response.text();
        console.log(data);
        const updatedList = users.filter((item)=>item.id!==i);
        setUsers(updatedList);
        setFilterdItems(users);

        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="container">
            {loading?(<p>Loading .... </p>):(<p></p>)}
            {error?(<p>{error}</p>):(<p></p>)}
            <h4>Show User Details</h4>
            <input className="search-box" type='text' placeholder="Search Here" name="searchBox" onChange={(e)=>{setSearchQuery(e.target.value)}}></input>
            <table>
                <thead>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Delete Action</th>
                    <th>Edit Action</th>
                </thead>
                <tbody>
                {filterdItems.map((user,index)=>(
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{editingRow===index?(<input value={user.firstName} onChange={(e)=>{handleChange(index,"firstName",e.target.value)}}/>):(user.firstName)}</td>
                        <td>{editingRow===index?(<input value={user.lastName} onChange={(e)=>{handleChange(index,"lastName",e.target.value)}}/>):(user.lastName)}</td>
                        <td>{editingRow===index?(<input value={user.mobNo} onChange={(e)=>{handleChange(index,"mobNo",e.target.value)}}/>):(user.mobNo)}</td>
                        <td>{editingRow===index?(<input value={user.email} onChange={(e)=>{handleChange(index,"email",e.target.value)}}/>):(user.email)}</td>
                        <td>{user.created_dt}</td>
                        <td>{user.updated_dt}</td>
                        <td><button onClick={()=>handleRemove(user.id)}>Delete</button></td>
                        <td>{editingRow===index?(<button onClick={()=>{handleSave(index)}}>Save</button>):(<button onClick={()=>{handleEdit(index)}}>Edit</button>)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div><button onClick={handleClose}>Close</button></div>
        </div>
    );
}

export default ShowUserDetails;