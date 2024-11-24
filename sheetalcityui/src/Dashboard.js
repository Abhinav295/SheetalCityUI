import React from "react";
function Dashboard({onLogout}){
return(
    <div>
        <h1>Welcome to the Dashboard</h1>
        <p>You are successfully logged in!</p>
        <button onClick={onLogout}>Logout</button>
    </div>
)
}
export default Dashboard;
