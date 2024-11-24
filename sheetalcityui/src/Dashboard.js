import React from "react";
function Dashboard({onLogout,userName}){
return(
    <div>
        <h1>Welcome to the Dashboard</h1>
        <p>You are successfully logged in!</p>
        <h3>Welcome {userName}</h3>
        <button onClick={onLogout}>Logout</button>
    </div>
)
}
export default Dashboard;
