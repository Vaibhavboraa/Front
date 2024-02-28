

import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import './style.css';
import '../AdminCustomerManagement/style.css'

function AdminCustomerManagement() {
   
    const [customers, setCustomers] = useState([]);
    const [customerIdInput, setCustomerIdInput] = useState("");
    const [customerById, setCustomerById] = useState(null);
    var [updateNameResponse, setUpdateNameResponse] = useState("");
    const[message,setMessage]=useState('');
    const[message1,setMessage1]=useState('');
   

    const [newCustomerData, setNewCustomerData] = useState({
        email: "",
        password: "",
        name: "",
        dob: "",
        age: "",
        phoneNumber: "",
        address: "",
        aadharNumber: "",
        panNumber: "",
        gender: ""
    });
    const [deactivateResponse, setDeactivateResponse] = useState("");
    const [activateResponse, setActivateResponse] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleShowRegisterModal = () => setShowRegisterModal(true);
    const handleCloseRegisterModal = () => setShowRegisterModal(false);

  

    const getCustomerById = () => {
        if (customerIdInput === '') {
            setMessage('Customer ID cannot be empty');
            return;
        }
    
        fetch(`http://localhost:5155/api/AdministratorCustomer/GetCustomerById?id=${customerIdInput}`)
            .then(res => res.json())
            .then(customer => {
                console.log(customer);
                setCustomerById(customer);
                setMessage('');
            })
            .catch(error => {
                console.error('Error fetching customer by ID:', error);
                setCustomerById('');
                setMessage('No customer found with this ID');
            });
    };
    

    const getAllCustomers = () => {
        fetch("http://localhost:5155/api/AdministratorCustomer/GetAllCustomers")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setCustomers(res);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCustomerData({ ...newCustomerData, [name]: value });
    };

    // const registerCustomer = () => {
    //     fetch("http://localhost:5155/api/AdministratorCustomer/RegisterCustomer", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'accept': 'text/plain'
    //         },
    //         body: JSON.stringify(newCustomerData)
    //     })
    //         .then(res => res.text())
    //         .then(response => {
    //             console.log(response);
    //             setMessage1('Customer registered successfully');
    //             handleCloseRegisterModal(); 
    //         })
    //         .catch(error => {
    //             console.error('Error registering customer:', error);
    //             setMessage1('Error registering customer');
    //         });
    // };

    // const registerCustomer = () => {
    //     fetch("http://localhost:5155/api/AdministratorCustomer/RegisterCustomer", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'accept': 'text/plain'
    //         },
    //         body: JSON.stringify(newCustomerData)
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.text();
    //             } else {
    //                 throw new Error(`Failed to register customer. Status: ${res.status}`);
    //             }
    //         })
    //         .then(response => {
    //             console.log(response);
    //             setMessage1('Customer registered successfully');
    //             handleCloseRegisterModal(); 
    //         })
    //         .catch(error => {
    //             console.error('Error registering customer:', error.message);
    //             setMessage1('Error registering customer');
    //         });
    // };

    const registerCustomer = () => {
      
        const requiredFields = ['email', 'password', 'name', 'dob', 'phoneNumber', 'address'];
        const missingFields = requiredFields.filter(field => !newCustomerData[field]);
    
        if (missingFields.length > 0) {
          
            setMessage1(`Please fill in the following fields: ${missingFields.join(', ')}`);
            return;
        }
    
        fetch("http://localhost:5155/api/AdministratorCustomer/RegisterCustomer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain'
            },
            body: JSON.stringify(newCustomerData)
        })
            .then(res => {
                if (res.ok) {
                    return res.text();
                } else {
                    throw new Error(`Failed to register customer. Status: ${res.status}`);
                }
            })
            .then(response => {
                console.log(response);
                setMessage1('Customer registered successfully');
                handleCloseRegisterModal(); 
            })
            .catch(error => {
                console.error('Error registering customer:', error.message);
                setMessage1('Error registering customer');
            });
    };
    
    

    const deactivateCustomer = () => {
       

        if (customerIdInput==='')
        {
            setDeactivateResponse('Customer ID cannot be empty');
          
            return;
        }
        fetch(`http://localhost:5155/api/AdministratorCustomer/DeactivateCustomer?customerId=${customerIdInput}`, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain'
            }
        })
            .then(res => res.text())
            .then(response => {
                setDeactivateResponse(response);
            })
            .catch(error => {
                console.error('Error deactivating customer:', error);
            });
    };
    
    const activateCustomer = () => {
        if (customerIdInput==='')
        {
            setActivateResponse('Customer ID cannot be empty');
          
            return;
        }
        fetch(`http://localhost:5155/api/AdministratorCustomer/ActivateCustomer?customerId=${customerIdInput}`, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain'
            }
        })
            .then(res => res.text())
            .then(response => {
                setActivateResponse(response);
            })
            .catch(error => {
                console.error('Error activating customer:', error);
            });
    };
    
    // var updateCustomerName = () => {
    //     fetch(`http://localhost:5155/api/AdministratorCustomer/UpdateCustomerName?customerId=${customerIdInput}`, {
    //         method: 'PUT',
    //         headers: {
    //             'accept': 'text/plain',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "name": newCustomerData.name,
    //         })
    //     })
    //         .then(res => res.text())
    //         .then(response => {
    //             setUpdateNameResponse(response);
    //         })
    //         .catch(error => {
    //             console.error('Error updating customer name:', error);
    //         });
    // };
    var updateCustomerName = () => {
       
        if (customerIdInput === '' && newCustomerData.name === '') {
            setUpdateNameResponse('Customer ID and name cannot be empty');
            return;
        }
    
        
        if (customerIdInput === '') {
            setUpdateNameResponse('Customer ID cannot be empty');
            return;
        }
    
       
        if (newCustomerData.name === '') {
            setUpdateNameResponse('Customer name cannot be empty');
            return;
        }
    
        fetch(`http://localhost:5155/api/AdministratorCustomer/UpdateCustomerName?customerId=${customerIdInput}`, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": newCustomerData.name,
            })
        })
            .then(res => res.text())
            .then(response => {
                setUpdateNameResponse(response);
            })
            .catch(error => {
                console.error('Error updating customer name:', error);
            });
    };
    
    



    return (
        <div>
            {/* <div className="container"> */}
            {/* Navigation */}
            
               
             

        <div className="container">
          
            {/* Content */}
            <div className="row mt-4">
             
                <div className="col-md-6">
                    <div className="card customerInfo">
                        <div className="card-body">
                            <h5 className="card-title cardHeader">Get All Customers</h5>
                            <button onClick={() => { handleShowModal(); getAllCustomers(); }}>Get All Customers</button>
                        </div>
                    </div>
                </div>

                {/* Customer Registration */}
                <div className="col-md-6">
                    <div className="card customerInfo">
                        <div className="card-body">
                            <h5 className="card-title cardHeader">Customer Registration</h5>
                            <button onClick={handleShowRegisterModal}>Register Customer</button>
                            {message1 && <p>{message1}</p>}
                        </div>
                    </div>
                </div>
                {/* Customer by id */}
                <div className="col-md-12 mt-4">
                    <div className="card customerInfo justify-content-center">
                        <div className="card-body">
                            <h5 className="card-title cardHeader">Customer Search</h5>
                            <label htmlFor="customerIdInput" className="label">Enter Customer ID: </label>
                            <input
                                type="text"
                                id="customerIdInput"
                                value={customerIdInput}
                                onChange={(event) => setCustomerIdInput(event.target.value)}
                                className="value"
                            />
                            <button onClick={getCustomerById}>Fetch Customer by ID</button>
                            {message && <p>{message}</p>}
                            {customerById && (
                                <div key={customerById.customerID} className="customerDetails">
                                    <h2>Name: <span className="value">{customerById.name}</span></h2>
                                    <br />
                                    <p>ID: <span className="value">{customerById.customerID}</span></p>
                                    <p>DOB: <span className="value">{customerById.dob}</span></p>
                                    <p>Phone: <span className="value">{customerById.phoneNumber}</span></p>
                                    <p>Address: <span className="value">{customerById.address}</span></p>
                                    <p>Email: <span className="value">{customerById.email}</span></p>
                                    <hr />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Deactivate Customer */}
                <div className="col-md-6 mt-4">
                    <div className="card customerInfo">
                        <div className="card-body">
                            <h5 className="card-title cardHeader">Deactivate Customer</h5>
                            <label htmlFor="deactivateCustomerIdInput" className="label">Enter Customer ID: </label>
                            <input
                                type="text"
                                id="deactivateCustomerIdInput"
                                value={customerIdInput}
                                onChange={(event) => setCustomerIdInput(event.target.value)}
                                className="value"
                            />
                            <button onClick={deactivateCustomer} >Deactivate Customer</button>
                         
                            {deactivateResponse && (
                                <div className="response">
                                    <p>{deactivateResponse}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Activate Customer */}
                <div className="col-md-6 mt-4">
                    <div className="card customerInfo">
                        <div className="card-body">
                            <h5 className="card-title cardHeader">Activate Customer</h5>
                            <label htmlFor="activateCustomerIdInput" className="label">Enter Customer ID: </label>
                            <input
                                type="text"
                                id="activateCustomerIdInput"
                                value={customerIdInput}
                                onChange={(event) => setCustomerIdInput(event.target.value)}
                                className="value"
                            />
                            <button onClick={activateCustomer}>Activate Customer</button>
                          
                            {activateResponse && (
                                <div className="response">
                                    <p>{activateResponse}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                
                <div className="col-md-6 mt-4">
                <div className="card customerInfo">
                    <div className="card-body">
                        <h5 className="card-title cardHeader">Update Customer Name</h5>
                        <label htmlFor="updateNameCustomerIdInput" className="label">Enter Customer ID: </label>
                        <input
                            type="text"
                            id="updateNameCustomerIdInput"
                            value={customerIdInput}
                            onChange={(event) => setCustomerIdInput(event.target.value)}
                            className="value"
                        />
                        <label htmlFor="updateNameInput" className="label">Enter New Name: </label>
                        <input
                            type="text"
                            id="updateNameInput"
                            value={newCustomerData.name}
                            onChange={(event) => setNewCustomerData({ ...newCustomerData, name: event.target.value })}
                            className="value"
                        />
                        <button onClick={updateCustomerName}>Update Customer Name</button>
                        {updateNameResponse && (
                            <div className="response">
                                <p>{updateNameResponse}</p>
                            </div>
                        )}
                    </div>
                </div>
                </div>

               
               

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>All Customers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {customers.map((customer) => (
                        <div key={customer.customerID} className="customerDetails">
                            <h2>Name: <span className="value">{customer.name}</span></h2>
                            <br />
                            <p>ID: <span className="value">{customer.customerID}</span></p>
                            <p>DOB: <span className="value">{customer.dob}</span></p>
                            <p>Phone: <span className="value">{customer.phoneNumber}</span></p>
                            <p>Address: <span className="value">{customer.address}</span></p>
                            <p>Email: <span className="value">{customer.email}</span></p>
                            <hr />
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Register New Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Email:</label>
                    <input type="email" name="email" value={newCustomerData.email} onChange={handleInputChange} className="value" />
                    <label>Password:</label>
                    <input type="password" name="password" value={newCustomerData.password} onChange={handleInputChange} className="value" />
                    <label>Name:</label>
                    <input type="text" name="name" value={newCustomerData.name} onChange={handleInputChange} className="value" />
                    <label>DOB:</label>
                    <input type="date" name="dob" value={newCustomerData.dob} onChange={handleInputChange} className="value" />
                    <label>Age:</label>
                    <input type="text" name="age" value={newCustomerData.age} onChange={handleInputChange} className="value" />
                    <label>Phone:</label>
                    <input type="text" name="phoneNumber" value={newCustomerData.phoneNumber} onChange={handleInputChange} className="value" />
                    <label>Address:</label>
                    <input type="text" name="address" value={newCustomerData.address} onChange={handleInputChange} className="value" />
                    <label>Aadhaar Number:</label>
                    <input type="text" name="aadharNumber" value={newCustomerData.aadharNumber} onChange={handleInputChange} className="value" />
                    <label>PAN Number:</label>
                    <input type="text" name="panNumber" value={newCustomerData.panNumber} onChange={handleInputChange} className="value" />
                    <label>Gender:</label>
                    <input type="text" name="gender" value={newCustomerData.gender} onChange={handleInputChange} className="value" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRegisterModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={registerCustomer}>
                        Register
                    </Button>
                </Modal.Footer>
            </Modal>
            
            </div>
        </div>
        </div>
    );
}

export default AdminCustomerManagement;
