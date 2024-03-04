import { useState } from 'react'
import './CustomerLogin.css'
//
import { Outlet, useNavigate } from 'react-router-dom';
//

import { Link } from 'react-router-dom';

function CustomerLogin() {
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [loggedin, setLoggedin] = useState(false);

    //
    var navigate = useNavigate();
    //
    const [errorMessage, setErrorMessage] = useState("");
    var user = {};
    var login = (e) => {
        e.preventDefault();
        user.email = email;
        user.password = password;
        user.userType = "";
        user.token = "";
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
        console.log(requestOptions);
        fetch("http://localhost:5155/api/Customer/Login", requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.userType === "Customer") {
                    sessionStorage.setItem("token", res.token);
                    sessionStorage.setItem("email", res.email);


                    sessionStorage.setItem("userType", res.userType);


                    alert("Login success-" + res.email);
                    //
                    navigate('/customer');
                    //
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

            {/* {loggedin == true ? <h2 className='alert successMesage '>Welcome-{email}</h2> : null}
            <div className='alert  divlogin'> */}
            {loggedin ? <h2 className='alert successMesage '>Welcome-{email}</h2> : null}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-5">Customer Login</h5>
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
                                    {/* {errorMessage && <p className="text-danger">{errorMessage}</p>} */}
                                    <div className='buttons'>
                                        <button onClick={login} className="btn success ">Login</button>



                                        <button className="btn  cancel">Cancel</button>

                                    </div>
                                         <div className="text-center mt-3">

                                        <Link
                                            to="/forgotpassword"
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

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        // </div>

    );
}
export default CustomerLogin;