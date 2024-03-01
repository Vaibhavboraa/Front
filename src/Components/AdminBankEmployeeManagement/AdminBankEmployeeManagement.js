import React, { useState, useEffect } from 'react';
import './AdminBankEmployeeManagement.css';

function AdminBankEmployeeManagement() {
    var [employees, setEmployees] = useState([]);
    var [employeeById, setEmployeeById] = useState(null);
    var [showData, setShowData] = useState(false);
    var [employeeIdInput, setEmployeeIdInput] = useState('');
    var [registrationData, setRegistrationData] = useState({
        email: '',
        password: '',
        name: '',
        position: '',
        phone: ''
    });
    var [registrationResponse, setRegistrationResponse] = useState(null);
    var [message, setMessage] = useState('');
    var [message1, setMessage1] = useState('');
    var [message2, setMessage2] = useState('');
    var [message3, setMessage3] = useState('');
    var [message4, setMessage4] = useState('');

    useEffect(() => {

        fetch('http://localhost:5155/api/AdminBankEmployees/GetAllEmployees', {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {

                setEmployees(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    var handleShowData = () => {
        setShowData(true);
    };


    const handleClose = () => {
        setShowData(false);
    };

    // var handleGetEmployeeById = () => {
    //     // Fetch data for a specific employee by ID
    //     fetch(`http://localhost:5155/api/AdminBankEmployees/get employee by id?employeeId=${employeeIdInput}`, {
    //         method: 'GET',
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {

    //             setEmployeeById(data);
    //             setMessage('');
    //             //

    //         })
    //         .catch(error => {
    //             console.error('Error fetching employee by ID:', error);
    //             setEmployeeById('');

    //             setMessage('Employee Not Found');
    //         });
    // };

    var handleGetEmployeeById = () => {

        if (employeeIdInput === '') {
            setMessage('Employee ID cannot be empty');
            return;
        }

        fetch(`http://localhost:5155/api/AdminBankEmployees/get employee by id?employeeId=${employeeIdInput}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Employee Data:', data);
                setEmployeeById(data);
                setMessage('');
            })
            .catch(error => {
                console.error('Error fetching employee by ID:', error);
                setEmployeeById('');
                setMessage('Employee Not Found');
            });
    };



    // var handleDeactivateEmployee = () => {
    //     // Deactivate an employee by ID
    //     fetch(`http://localhost:5155/api/AdminBankEmployees/Deactivate Employee?employeeId=${employeeIdInput}`, {
    //         method: 'POST',
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {

    //             console.log('Employee Deactivated:', data);
    //         })
    //         .catch(error => {
    //             console.error('Error deactivating employee:', error);
    //         });
    // };


    // var handleDeactivateEmployee = () => {


    //     if (employeeIdInput === '') {
    //         setMessage1('Employee ID cannot be empty');
    //         return;
    //     }
    //     // Deactivate an employee by ID
    //     fetch(`http://localhost:5155/api/AdminBankEmployees/Deactivate Employee?employeeId=${employeeIdInput}`, {
    //         method: 'POST',
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log('Employee Deactivated:', data);

    //             setMessage1('Employee Deactivated Successfully');
    //         })
    //         .catch(error => {
    //             console.error('Error deactivating employee:', error);

    //             setMessage1('Employee with the given ID not found');
    //         });
    // };


    var handleDeactivateEmployee = () => {
        if (employeeIdInput === '') {
            setMessage1('Employee ID cannot be empty');
            return;
        }

       
        const confirmed = window.confirm('Are you sure you want to deactivate this employee?');

        if (!confirmed) {
           
            setMessage1('Deactivation canceled by user');
            return;
        }

      
        fetch(`http://localhost:5155/api/AdminBankEmployees/Deactivate Employee?employeeId=${employeeIdInput}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Employee Deactivated:', data);
                setMessage1('Employee Deactivated Successfully');
            })
            .catch(error => {
                console.error('Error deactivating employee:', error);
                setMessage1('Employee with the given ID not found');
            });
    };


    // var handleActivateEmployee = () => {
    //     // Activate an employee by ID
    //     fetch(`http://localhost:5155/api/AdminBankEmployees/Activate Employee?employeeId=${employeeIdInput}`, {
    //         method: 'POST',
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             // Handle the response, if necessary
    //             console.log('Employee Activated:', data);
    //         })
    //         .catch(error => {
    //             console.error('Error activating employee:', error);
    //         });
    // };


    // var handleActivateEmployee = () => {


    //     if (employeeIdInput === '') {
    //         setMessage2('Employee ID cannot be empty');
    //         return;
    //     }
    //     // Activate an employee by ID
    //     fetch(`http://localhost:5155/api/AdminBankEmployees/Activate Employee?employeeId=${employeeIdInput}`, {
    //         method: 'POST',
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log('Employee Activated:', data);

    //             setMessage2('Employee Activated Successfully');
    //         })
    //         .catch(error => {
    //             console.error('Error activating employee:', error);

    //             setMessage2('Employee with the given ID not found');
    //         });
    // };



    var handleActivateEmployee = () => {
        if (employeeIdInput === '') {
            setMessage2('Employee ID cannot be empty');
            return;
        }

       
        const confirmed = window.confirm('Are you sure you want to activate this employee?');

        if (!confirmed) {
        
            setMessage2('Activation canceled by user');
            return;
        }

        fetch(`http://localhost:5155/api/AdminBankEmployees/Activate Employee?employeeId=${employeeIdInput}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Employee Activated:', data);
                setMessage2('Employee Activated Successfully');
            })
            .catch(error => {
                console.error('Error activating employee:', error);
                setMessage2('Employee with the given ID not found');
            });
    };




    var handleInputChange = (event) => {
        setEmployeeIdInput(event.target.value);
    };

    var handleRegistrationInputChange = (event) => {
        var { name, value } = event.target;
        setRegistrationData({
            ...registrationData,
            [name]: value
        });
    };

    // var handleRegisterEmployee = () => {
    //     fetch('http://localhost:5155/api/AdminBankEmployees/Register Bank Employee', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(registrationData)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setRegistrationResponse(data);
    //             console.log('Registration Response:', data);
    //         })
    //         .catch(error => {
    //             console.error('Error registering employee:', error);
    //         });
    // };


    var handleRegisterEmployee = () => {
        const requiredFields = ['email', 'password', 'name', 'position', 'phone'];
        const missingFields = requiredFields.filter(field => !registrationData[field]);

        if (missingFields.length > 0) {
            setMessage4(`Please fill in the following fields: ${missingFields.join(', ')}`);
            return;
        }

        fetch('http://localhost:5155/api/AdminBankEmployees/Register Bank Employee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setRegistrationResponse(data);
                console.log('Registration Response:', data);
                setMessage4('Employee Registered Successfully');
            })
            .catch(error => {
                console.error('Error registering employee:', error);
                setMessage4('Error Registering Employee');
            });
    };


    // var handleRegisterEmployee = () => {
    //     fetch('http://localhost:5155/api/AdminBankEmployees/Register Bank Employee', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(registrationData)
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setRegistrationResponse(data);
    //             console.log('Registration Response:', data);
    //             setMessage4('Employee Registered Successfully');
    //         })
    //         .catch(error => {
    //             console.error('Error registering employee:', error);
    //             setMessage4('Error Registering Employee');
    //         });
    // };


    // var handleUpdateEmployee = () => {
    //     // Update an employee's position and phone by ID
    //     fetch(`http://localhost:5155/api/AdminBankEmployees/Update Bank Employee?employeeId=${employeeIdInput}`, {
    //         method: 'PUT',
    //         headers: {
    //             'accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             position: registrationData.position,
    //             phone: registrationData.phone
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Employee Updated:', data);

    //             handleGetEmployeeById();
    //             setMessage3('Employee Updated')
    //         })
    //         .catch(error => {
    //             console.error('Error updating employee:', error);
    //             setMessage3('Error Updating Employee');
    //         });
    // };



    var handleUpdateEmployee = () => {
        const requiredFields = ['position', 'phone'];

        const missingFields = requiredFields.filter(field => !registrationData[field]);

        if (missingFields.length > 0) {
            setMessage3(`Please fill in the following fields: ${missingFields.join(', ')}`);
            return;
        }

        fetch(`http://localhost:5155/api/AdminBankEmployees/Update Bank Employee?employeeId=${employeeIdInput}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                position: registrationData.position,
                phone: registrationData.phone
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Update Response:', data);

                if (data && data.employeeID) {
                    handleGetEmployeeById();
                    setMessage3('Employee Updated');
                } else {
                    setMessage3('Error Updating Employee');
                }
            })
            .catch(error => {
                console.error('Error updating employee:', error);
                setMessage3('Error Updating Employee');
            });
    };





    return (
        <div className="container">
            <h1 className='card-title cardHeader mt-4'>Employee Management</h1>
            <div className="row">
                <div className="col-md-6">
                    {/* Show All Employees */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Show All Employees</h5>
                            {/* <button className="btn" onClick={handleShowData}>Show All Employees</button> */}
                            <button
                                className="btn card-title"
                                onClick={handleShowData}
                                style={{
                                    fontSize: '18px',
                                    padding: '3px 8px',
                                }}
                            >
                                Show All Employees
                            </button>
                            <button
                                className="btn card-title"
                                onClick={handleClose}
                                style={{
                                    fontSize: '18px',
                                    padding: '3px 8px',
                                    marginLeft: '10px',
                                }}
                            >
                                Close
                            </button>

                            {showData && (
                                <div>
                                    <h2>All Employees</h2>
                                    <ul>
                                        {employees.map(employee => (
                                            <li key={employee.employeeID}>
                                                <p>ID:{employee.employeeID}</p>
                                                <p>Name: {employee.name}</p>
                                                <p>Email: {employee.email}</p>
                                                <p>Position: {employee.position}</p>
                                                <p>Phone: {employee.phone}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* Close button */}

                        </div>
                    </div>
                    {/* Get Employee by ID */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Get Employee by ID</h5>
                            <div>
                                <label>Enter Employee ID: </label>
                                <input type="text" value={employeeIdInput} onChange={handleInputChange} />
                                {/* <button className="btn card-title" onClick={handleGetEmployeeById}>Get Employee by ID</button> */}
                                <button
                                    className="btn card-title"
                                    onClick={handleGetEmployeeById}
                                    style={{
                                        fontSize: '18px',
                                        padding: '3px 8px',
                                    }}
                                >
                                    Get Employee by ID
                                </button>
                                {message && <p>{message}</p>}



                            </div>
                            {employeeById && (
                                <div>
                                    <h2>Employee by ID</h2>
                                    <p>Name: {employeeById.name}</p>
                                    <p>Email: {employeeById.email}</p>
                                    <p>Position: {employeeById.position}</p>
                                    <p>Phone: {employeeById.phone}</p>
                                </div>
                            )}

                        </div>
                    </div>
                    {/* Deactivate Employee */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Deactivate Employee</h5>
                            <div>
                                <label>Enter Employee ID: </label>
                                <input type="text" value={employeeIdInput} onChange={handleInputChange} />
                                {/* <button className="btn card-title " onClick={handleDeactivateEmployee}>Deactivate Employee</button> */}
                                <button
                                    className="btn card-title"
                                    onClick={handleDeactivateEmployee}
                                    style={{
                                        fontSize: '18px',
                                        padding: '3px 8px',
                                    }}
                                >
                                    Deactivate Employee
                                </button>
                                {message1 && <p>{message1}</p>}

                            </div>
                        </div>
                    </div>
                    {/* Activate Employee */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Activate Employee</h5>
                            <div>
                                <label>Enter Employee ID: </label>
                                <input type="text" value={employeeIdInput} onChange={handleInputChange} />
                                {/* <button className="btn card-title " onClick={handleActivateEmployee}>Activate Employee</button> */}
                                <button
                                    className="btn card-title"
                                    onClick={handleActivateEmployee}
                                    style={{
                                        fontSize: '14x',
                                        padding: '3px 8px',
                                    }}
                                >
                                    Activate Employee
                                </button>
                                {message2 && <p>{message2}</p>}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* Register Employee */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Register Employee</h5>
                            <div>
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" name="email" value={registrationData.email} onChange={handleRegistrationInputChange} />
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" name="password" value={registrationData.password} onChange={handleRegistrationInputChange} />
                            </div>
                            <div>
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Enter name" name="name" value={registrationData.name} onChange={handleRegistrationInputChange} />
                            </div>
                            <div>
                                <label>Position</label>
                                <input type="text" className="form-control" placeholder="Enter position" name="position" value={registrationData.position} onChange={handleRegistrationInputChange} />
                            </div>
                            <div>
                                <label>Phone</label>
                                <input type="text" className="form-control" placeholder="Enter phone number" name="phone" value={registrationData.phone} onChange={handleRegistrationInputChange} />
                            </div>
                            {/* <button className="btn card-title" onClick={handleRegisterEmployee}>
                                Register Employee
                            </button> */}
                            <button
                                className="btn card-title"
                                onClick={handleRegisterEmployee}
                                style={{
                                    fontSize: '18px',
                                    padding: '3px 8px',
                                }}
                            >
                                Register Employee
                            </button>
                            {message4 && <p>{message4}</p>}

                        </div>
                    </div>
                    {/* Update Employee */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Update Employee</h5>
                            <div>
                                <label>Enter Employee ID: </label>
                                <input type="text" value={employeeIdInput} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Position</label>
                                <input type="text" className="form-control" placeholder="Enter position" name="position" value={registrationData.position} onChange={handleRegistrationInputChange} />
                            </div>
                            <div>
                                <label>Phone</label>
                                <input type="text" className="form-control" placeholder="Enter phone number" name="phone" value={registrationData.phone} onChange={handleRegistrationInputChange} />
                            </div>
                            {/* <button className="btn card-title " onClick={handleUpdateEmployee}>
                                Update Employee
                            </button> */}
                            <button
                                className="btn card-title"
                                onClick={handleUpdateEmployee}
                                style={{
                                    fontSize: '18px',
                                    padding: '3px 8px',
                                }}
                            >
                                Update Employee
                            </button>
                            {message3 && <p>{message3}</p>}

                        </div>
                    </div>
                </div>
            </div>
            {/* Registration Response */}
            {registrationResponse && (
                <div className="card mt-4">
                    <div className="card-body">
                        <h2 className='card-title'>Registration Response</h2>
                        <p>Name: {registrationResponse.name}</p>
                        <p>Email: {registrationResponse.email}</p>
                        <p>Position: {registrationResponse.position}</p>
                        <p>Phone: {registrationResponse.phone}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminBankEmployeeManagement;