import React, { useState, useEffect } from 'react';
import '../Customer/Customer.css';

function Customer() {
    const [customerInfo, setCustomerInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState(''); 
    const[message1,setMessage1]=useState('');
    const[message2,setMessage2]=useState('');
    const[message3,setMessage3]=useState('');
    const token = sessionStorage.getItem('token');
    

    useEffect(() => {
        const emailFromStorage = sessionStorage.getItem('email');
        setEmail(emailFromStorage);
    }, []);

    useEffect(() => {

        if (email) {
            fetch(`http://localhost:5155/api/Customer/GetCustomerInfoByEmail?email=${encodeURIComponent(email)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch customer information');
                    }
                    return response.json();
                })
                .then(data => {
                    setCustomerInfo(data);
                    sessionStorage.setItem('customerId', data.customerID);
                })
                .catch(error => {
                    setErrorMessage('Error fetching customer information');
                    console.error('Error fetching customer information:', error);
                });
        }
    }, [email]);

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            setMessage1('New Password and Confirm Password must match.');
            return;
        }
        if(confirmPassword==='')
        {
            setMessage1('Confirm Password cannot be empty');
            return;
        }
        if(newPassword==='')
        {
            setMessage1('Confirm Password cannot be empty');
            return;
        }
        fetch(`http://localhost:5155/api/Customer/UpdatePassword?email=${encodeURIComponent(email)}&newPassword=${encodeURIComponent(newPassword)}`, {
            method: 'POST',
            headers: {
                'accept': '/',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.text())
            .then(data => {
                setMessage1(data);
                setNewPassword('');
                setConfirmPassword('');
            })
            .catch(error => console.error('Error resetting password:', error));
    };

    const handleChangePhoneNumber = () => {

        if(phone==='')
        {
            setMessage('Phone Number cannot be empty');
            return;
        }
        if (customerInfo) {
            const customerId = customerInfo.customerID;
            fetch(`http://localhost:5155/api/Customer/ChangePhoneNumber?id=${encodeURIComponent(customerId)}&phone=${encodeURIComponent(phone)}`, {
                method: 'PUT',
                headers: {
                    'accept': '/',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to change phone number');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setCustomerInfo(prevCustomerInfo => ({
                        ...prevCustomerInfo,
                        phoneNumber: data.phoneNumber 
                    }));
                    setMessage('Phone Number changed successfully.');
                })
                .catch(error => console.error('Error changing phone number:', error));
               // setCustomerInfo('');
                setMessage("Error Updating phone number");
        }
    };
    
    const handleChangeName = () => {
        if(name==='')
        {
            setMessage2('name cannot be empty');
            return;
        }
        if (customerInfo) {
            const customerId = customerInfo.customerID;
            fetch(`http://localhost:5155/api/Customer/ChangeName?id=${encodeURIComponent(customerId)}&name=${encodeURIComponent(name)}`, {
                method: 'PUT',
                headers: {
                    'accept': '/',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to change name');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setCustomerInfo(prevCustomerInfo => ({
                        ...prevCustomerInfo,
                        name: data.name 
                    }));
                    setMessage2('Name Changed Successfully');
                })
                .catch(error => console.error('Error changing name:', error));
        }
    };
    
    const handleChangeAddress = () => {
 
        if(address==='')
        {
            setMessage3('Address cannot be empty');
            return;
        }

        if (customerInfo) {
            const customerId = customerInfo.customerID;
            fetch(`http://localhost:5155/api/Customer/ChangeAddress?id=${encodeURIComponent(customerId)}&address=${encodeURIComponent(address)}`, {
                method: 'PUT',
                headers: {
                    'accept': '/',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to change address');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setCustomerInfo(prevCustomerInfo => ({
                        ...prevCustomerInfo,
                        address: data.address 
                       
                    }));
                    setMessage3('Address changed Successfully');
                })
                .catch(error => console.error('Error changing address:', error));
        }
    };
    

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card mt-4 h-50">
                        <div className="card-body">
                            <h2 className="card-title">Customer Information</h2>
                            {customerInfo && (
                                <div>
                                    <p><strong>Name:</strong> {customerInfo.name}</p>
                                    <p><strong>Customer Id:</strong> {customerInfo.customerID}</p>
                                    <p><strong>Date of Birth:</strong> {customerInfo.dob}</p>
                                    <p><strong>Age:</strong> {customerInfo.age}</p>
                                    <p><strong>Phone Number:</strong> {customerInfo.phoneNumber}</p>
                                    <p><strong>Address:</strong> {customerInfo.address}</p>
                                    <p><strong>Email:</strong> {customerInfo.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="card mt-4">
                        <div className="card-body">
                            <h2 className="card-title">Password Reset</h2>
                            <div className="form-group">
                                <label>New Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button onClick={handleResetPassword} className="btn buttons card-title"
                             style={{fontSize: '16px', padding:'10px 15px'}}>Reset Password</button>
                            {message1 && <p>{message1}</p>}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mt-3">
                        <div className="card-body">
                            <h2 className="card-title">Change Phone Number</h2>
                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <button onClick={handleChangePhoneNumber} className="btn buttons card-title"
                             style={{fontSize: '16px', padding:'10px 15px'}}>Change Phone Number</button>
                            {message && <p>{message}</p>}
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h2 className="card-title">Change Name</h2>
                            <div className="form-group">
                                <label>New Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <button onClick={handleChangeName} className="btn buttons card-title" 
                            style={{fontSize: '16px', padding:'10px 15px'}}
                            >Change Name</button>
                            {message2 && <p>{message2}</p>}
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h2 className="card-title">Change Address</h2>
                            <div className="form-group">
                                <label>New Address:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </div>
                            <button onClick={handleChangeAddress} className="btn buttons card-title" 
                             style={{fontSize: '16px', padding:'10px 15px'}}>Change Address</button>
                              {message3 && <p>{message3}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customer;

//mine
// import React, { useState } from 'react';
// //import '../Customer/Customer.css'
// function Customer() {
//     const [email, setEmail] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [phone, setPhone] = useState('');
//     const [customerId, setCustomerId] = useState('');
//     const [name, setName] = useState('');
//     const [id, setId] = useState('');
//     const [address, setAddress] = useState('');
//     const [message1, setMessage1] = useState('');
//     const [message2, setMessage2] = useState('');
//     const [message3, setMessage3] = useState('');

    
//     //
//     const token = sessionStorage.getItem('token');
//     //

//     const handleResetPassword = () => {
//         fetch(`http://localhost:5155/api/Customer/UpdatePassword?email=${encodeURIComponent(email)}&newPassword=${encodeURIComponent(newPassword)}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Bearer ' + token,
//                 'accept': '/',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({})
//         })
//             .then(response => response.text())
//             .then(data => {
//                 setMessage(data);
//                 setEmail('');
//                 setNewPassword('');
//                 setConfirmPassword('');
//             })
//             .catch(error => console.error('Error resetting password:', error));
//     };

//     const handleChangePhoneNumber = () => {
//         fetch(`http://localhost:5155/api/Customer/ChangePhoneNumber?id=${encodeURIComponent(customerId)}&phone=${encodeURIComponent(phone)}`, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': 'Bearer ' + token,
//                 'accept': '/',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({})
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setMessage1('Phone number changed successfully');
//             })
//             .catch(error => console.error('Error changing phone number:', error));
//             setMessage1('Error changing phone number');
//     };

//     const handleChangeName = () => {
//         fetch(`http://localhost:5155/api/Customer/ChangeName?id=${encodeURIComponent(customerId)}&name=${encodeURIComponent(name)}`, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': 'Bearer ' + token,
//                 'accept': '/',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({})
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setMessage2('Name changed successfully');
//                 // Handle response data if needed
//             })
//             .catch(error => console.error('Error changing name:', error));
//             setMessage2('Error changing Name');
//     };
//     const handleChangeAddress = () => {
//         fetch(`http://localhost:5155/api/Customer/ChangeAddress?id=${encodeURIComponent(id)}&address=${encodeURIComponent(address)}`, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': 'Bearer ' + token,
//                 'accept': '/',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({})
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setMessage3('Address changed successfully');
//                 // Handle response data if needed
//             })
//             .catch(error => console.error('Error changing address:', error));
//             setMessage3('Error changing address');
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-6">
//                     <div className="card mt-4 h-50">
//                         <div className="card-body">
//                             <h2 className="card-title">Password Reset</h2>
//                             <div className="form-group">
//                                 <label>Email:</label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     value={email}
//                                     onChange={e => setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>New Password:</label>
//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     value={newPassword}
//                                     onChange={e => setNewPassword(e.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Confirm Password:</label>
//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     value={confirmPassword}
//                                     onChange={e => setConfirmPassword(e.target.value)}
//                                 />
//                             </div>
//                             {/* <button onClick={handleResetPassword} className="btn buttons card-title">Reset Password</button> */}
//                             <button
//                                 onClick={handleResetPassword}
//                                 className="btn buttons card-title"
//                                 style={{ fontSize: '16px', padding: '10px 15px' }}
//                             >
//                                 Reset Password
//                             </button>

//                             {message && <p>{message}</p>}
//                         </div>
//                     </div>

//                 </div>
//                 <div className="col-md-6">
//                     <div className="card mt-4">
//                         <div className="card-body">
//                             <h2 className="card-title">Change Phone Number</h2>
//                             <div className="form-group">
//                                 <label>Customer ID:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={customerId}
//                                     onChange={e => setCustomerId(e.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Phone Number:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={phone}
//                                     onChange={e => setPhone(e.target.value)}
//                                 />
//                             </div>
//                             {/* <button onClick={handleChangePhoneNumber} className="btn buttons card-title">Change Phone Number</button> */}
//                             <button
//                                 onClick={handleChangePhoneNumber}
//                                 className="btn buttons card-title"
//                                 style={{ fontSize: '16px', padding: '10px 15px' }}
//                             >
//                                 Change Phone Number
//                             </button>
//                             {message1 && <p>{message1}</p>}

//                         </div>
//                     </div>
//                     <div className="card mt-3">
//                         <div className="card-body">
//                             <h2 className="card-title">Change Name</h2>
//                             <div className="form-group">
//                                 <label>Customer ID:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={customerId}
//                                     onChange={e => setCustomerId(e.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>New Name:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={name}
//                                     onChange={e => setName(e.target.value)}
//                                 />
//                             </div>
//                             {/* <button onClick={handleChangeName} className="btn buttons card-title">Change Name</button> */}
//                             <button
//                                 onClick={handleChangeName}
//                                 className="btn buttons card-title"
//                                 style={{ fontSize: '16px', padding: '10px 15px' }}
//                             >
//                                 Change Name
//                             </button>
//                             {message2 && <p>{message2}</p>}

//                         </div>
//                     </div>
//                     <div className="card mt-3">
//                         <div className="card-body">
//                             <h2 className="card-title">Change Address</h2>
//                             <div className="form-group">
//                                 <label>Customer ID:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={id}
//                                     onChange={e => setId(e.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>New Address:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     value={address}
//                                     onChange={e => setAddress(e.target.value)}
//                                 />
//                             </div>
//                             {/* <button onClick={handleChangeAddress} className="btn buttons card-title">Change Address</button> */}
//                             <button
//                                 onClick={handleChangeAddress}
//                                 className="btn buttons card-title"
//                                 style={{ fontSize: '16px', padding: '10px 15px' }}
//                             >
//                                 Change Address
//                             </button>
//                             {message3 && <p>{message3}</p>}

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Customer;















