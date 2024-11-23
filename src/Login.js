import './App.css';

function Login() {
    return (
      <div className="App">
        <form className="form">
            <label className="lable" >Username</label>
            <input type="text" placeholder="Enter User Name"></input>
            <label className="lable">Password</label>
            <input type="password" placeholder="Enter Password"></input>
            <br></br>
            <div>
            <input type="radio" id="user1" name="userType" value="User"></input>
            <label className="lable" for="user1"> I Am a User</label>
            <input type="radio" id="user2" name="userType" value="Employee"></input>
            <label className="lable" for="user2"> I Am a Employee</label>
            <input type="radio" id="user3" name="userType" value="Admin"></input>
            <label className="lable" for="user3"> I Am a Admin</label><br></br>
            </div>
            <button>Sign In</button>
        </form>
      </div>
    );
  }
  
  export default Login;  