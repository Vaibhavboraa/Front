import { useState } from "react";
import './AdminRegistration.css';

function AdminRegistration() {
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [name, setName] = useState("");
   
    var [phone, setPhone] = useState("");

    var admin = {};
    var register = () => {
        admin.email = email;
        admin.password = password;
        admin.name = name;
        admin.phone = phone;
      
        console.log(admin);
        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(admin)
        }
        console.log(requestOptions);
        fetch("http://localhost:5155/api/AdminLogin/Admin Register", requestOptions)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));


    };
    var changename = (eventargs) => {
        setEmail(eventargs.target.value)
    }
    return (
        <div>
           
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Registration</h5>
                                <div className="alert divregister">
                                    <label className="form-control">Email</label>
                                    <input className="form-control" type="text" value={email}
                                        onChange={changename} />
                                    <label className="form-control">Password</label>
                                    <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label className="form-control">Name</label>
                                    <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                  
                                    <label className="form-control">Phone</label>
                                    <input className="form-control" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <div className="buttons">
                                        <button onClick={register} className="btn success">Register</button>
                                        <button className="btn cancel">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    );
}
export default AdminRegistration;