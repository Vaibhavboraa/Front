import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function BankEmployeeLogin() {
    // State variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedin, setLoggedin] = useState(false);

    



    //
    var navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    // Function to handle login
    const login = (e) => {
        e.preventDefault();

        // User object
        const user = {
            email: email,
            password: password,
            userType: "",
            token: ""
        };

        // Request options for fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };


  

        // Fetch to login endpoint
        fetch("http://localhost:5155/api/BankEmployeeLogin/login", requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.userType === "BankEmployee") {
                    // If user type is BankEmployee, set session and login
                    sessionStorage.setItem("token", res.token);
                    sessionStorage.setItem("email", res.email);


                    sessionStorage.setItem("userType", res.userType);
                    //
                    navigate('/bankemployee/account');
                    setLoggedin(true);
                } else {
                    // If user type is not BankEmployee, display error message
                    setLoggedin(false);
                    setErrorMessage("Error during login. Please check your credentials.");
                }
            })
            .catch(err => {
                console.log(err);
                setLoggedin(false);
                setErrorMessage("Error occurred during login");
            });
    };

    return (
        <div>
            {loggedin ? <h2 className='alert successMesage '>Welcome-{email}</h2> : null}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        
            <div className='alert divlogin'>
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title mb-5">Bank Employee Login</h5>
                                    <form>
                                        <div className="mb-3">
                                            <label className='form-label'>Email</label>
                                            <input
                                                placeholder='email'
                                                className='form-control'
                                                type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                placeholder='password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className='buttons'>
                                            <button onClick={login} className="btn success">Login</button>
                                            <button className="btn cancel">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankEmployeeLogin;