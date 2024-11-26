import React, { useState,useEffect } from "react";
import './App.css';

function ShowUserDetails({onShowUser}){
    const [users,setUsers] = useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]= useState(null);

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
            throw new Error("faield to fetch data");
        }
        const data = await response.json();
        setUsers(data);
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
        onShowUser(false);
    }

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
        const userList = [...users];
        userList.splice(i,1);
        setUsers(userList);

        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div>
            {loading?(<p>Loading .... </p>):(<p></p>)}
            {error?(<p>{error}</p>):(<p></p>)}
            <h6>Show User Details</h6>
            <table>
                <thead>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Action</th>
                </thead>
                <tbody>
                {users.map((user)=>(
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.mobNo}</td>
                        <td>{user.email}</td>
                        <td>{user.created_dt}</td>
                        <td>{user.updated_dt}</td>
                        <td><button onClick={()=>handleRemove(user.id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="form-group"><button onClick={handleClose}>Close</button></div>
        </div>
    );
}

export default ShowUserDetails;