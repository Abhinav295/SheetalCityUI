import './Main.css'


function AddAdvancePayment(){
    return (<div class="form-container">
        Add AddAdvance Payment
        <form className="form-group">
            <label>Select User Name </label>
            <select>
                <option>User 1</option>
                <option>User 2</option>
                <option>User 3</option>
            </select>

            <table>
                <thead>
                    <th>City</th>
                    <th>House No</th>
                    <th>Due Electricity</th>
                    <th>Due Maintenance</th>
                </thead>
                <tbody>
                    <tr>
                    <td>Phase 1</td>
                    <td>101</td>
                    <td>100</td>
                    <td>500</td>
                    </tr>
                </tbody>
            </table>
            <label>Total Due Maintenance</label>
            <p>100</p>
            <label>Total Due Electricity</label>
            <p>500</p>
            <label>Total Due Amount</label>
            <p>600</p>
            <label>Total Advance Maintenance</label>
            <p>100</p>
            <label>Total Advance Electricity</label>
            <p>500</p>
            <label>Total Advance Amount</label>
            <p>600</p>
            <label>Total Remaining Maintenance</label>
            <p>100</p>
            <label>Total Remaining Electricity</label>
            <p>500</p>
            <label>Total Remaining Amount</label>
            <p>600</p>
            <label>Advance Electricity Payment</label>
            <input type="text"></input>
            <br></br>
            <label>Advance Maintenance Payment</label>
            <input type="text"></input>
            <br></br>
            <label>Total Payment</label>
            <input type="text"></input>
        </form>
    </div>);
}

export default AddAdvancePayment;