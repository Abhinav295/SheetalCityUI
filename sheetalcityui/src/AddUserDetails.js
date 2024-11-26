import React, { useState,useEffect } from "react";

function AddUserDetails({onAddingUser}){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [isActive,setIsActive] = useState(true);

    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log(username);
        const bb = 'bb'
        try{
            const enCred = btoa(`${bb}:${bb}`);
            const loginData = {
                username:username,
                password:password,
                firstName:firstname,
                lastName:lastname,
                email:email,
                mobNo:mobile,
                isActive:false,
            }
            const response = await fetch("http://localhost:5000/sheetal.city/addUser",{
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
                onAddingUser(data,message);
                console.log(data)
            }else{
                onAddingUser("",message);
            }
        }catch(error){
            console.error("Error During Login",error);
            onAddingUser("");
        }
    };

    const handleClose = (e)=>{
        e.preventDefault();
        onAddingUser("","Tab is Closed Successfully");
    }

    return(
        <div>
        <h6>Add User Details</h6>
        <div className="form-group" ><button onClick={handleClose}>Close</button></div>
        <div class="form-container">
        <form className="form-group" onSubmit={handleSubmit}>
            <label className="lable" >Username</label>
            <input className="input-group" type="text" placeholder="Enter User Name" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            <label className="lable">Password</label>
            <input className="input-group" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <label className="lable">First Name</label>
            <input className="input-group" type="text" placeholder="Enter First Name" value={firstname} onChange={(e)=>setFirstname(e.target.value)}></input>
            <label className="lable">Last Name</label>
            <input className="input-group" type="text" placeholder="Enter Last Name" value={lastname} onChange={(e)=>setLastname(e.target.value)}></input>
            <label className="lable">Email Address</label>
            <input className="input-group" type="email" placeholder="Enter Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <label className="lable">Mobile Number</label>
            <input className="input-group" type="text" placeholder="Enter Mobile Number" value={mobile} onChange={(e)=>setMobile(e.target.value)}></input>
            <label className="lable">Active User</label>
            <input className="input-group" type="checkbox" placeholder="Is User Active" value={isActive} onChange={(e)=>setIsActive(e.target.value)}></input>
            <br></br>
            <button type="submit">Add Details</button>
        </form>
        </div>
        </div>
    )

}
export default AddUserDetails;