import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminLogin() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedin, setLoggedin] = useState(false);

  
    var navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

   
    const login = (e) => {
        e.preventDefault();

       
        const user = {
            email: email,
            password: password,
            userType: "",
            token: ""
        };

      
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

       
        fetch("http://localhost:5155/api/AdminLogin/AdminLogin", requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.userType === "Admin") {
                   
                    sessionStorage.setItem("token", res.token);
                    sessionStorage.setItem("email", res.email);


                    sessionStorage.setItem("userType", res.userType);


                    alert("Login success-" + res.email);
                    //

                    
                    navigate('/admincustomermanagement');
                    setLoggedin(true);
                } else {
                  
                    setLoggedin(false);
                    setErrorMessage("Incorrect credentials");
                }
            })
            .catch(err => {
                console.log(err);
                setLoggedin(false);
                setErrorMessage("Error during login. Please check your credentials.");
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
                                    <h5 className="card-title mb-5">Admin Login</h5>
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
                                    <div className="text-center mt-3">
                                        <Link
                                            to="/admin/forgotpassword"
                                            style={{
                                                textDecoration: 'none',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '12px',
                                                padding: '10px 10px',
                                                border: '2px solid white',
                                                borderRadius: '5px',
                                                transition: 'background-color 0.3s ease',
                                                display: 'inline-block',
                                                cursor: 'pointer',
                                                backgroundColor: 'black',
                                                marginTop: '-40px',
                                            }}
                                        >
                                            Forgot Password
                                        </Link>
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

export default AdminLogin;