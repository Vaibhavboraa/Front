import React, { useState, useEffect } from 'react';

function CustomerAccount() {
    const [accountType, setAccountType] = useState('');
    const [ifsc, setIFSC] = useState('');
    const [accountNumberToClose, setAccountNumberToClose] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountDetails, setAccountDetails] = useState(null);
    const [customerAccounts, setCustomerAccounts] = useState([]);
    const [openAccountStatus, setOpenAccountStatus] = useState('');
    const [closeAccountStatus, setCloseAccountStatus] = useState('');
    const [openAccountError, setOpenAccountError] = useState('');
    const [closeAccountError, setCloseAccountError] = useState('');
    const [getAccountDetailsError, setGetAccountDetailsError] = useState('');
    const accountTypes = ["Savings", "Current", "Business"];
    const token = sessionStorage.getItem('token');
    const customerId = sessionStorage.getItem('customerId');

    useEffect(() => {
        fetchCustomerAccounts();
    }, []);

    const fetchCustomerAccounts = () => {
        fetch(`http://localhost:5155/api/CustomerAccount/GetAccountDetailsByCustomerId?customerId=${customerId}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            setCustomerAccounts(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    };

    const handleOpenAccount = () => {
        const requestBody = {
            accountType: accountType,
            ifsc: ifsc,
            customerID: customerId 
        };

        fetch('http://localhost:5155/api/CustomerAccount/Open%20Account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                setOpenAccountStatus('Account opening request sent.');
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {})
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            setOpenAccountError('Failed to open account: ' + error.message);
        });
    };

    const handleCloseAccount = () => {
        fetch(`http://localhost:5155/api/CustomerAccount/Close%20Account?accountNumber=${accountNumberToClose}`, {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (response.ok) {
                setCloseAccountStatus('Account closing request sent.');
                return response.text();
            }
            throw new Error('Failed to close account.');
        })
        .then(data => {})
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            setCloseAccountError(error.message);
        });
    };

    const handleGetAccountDetails = () => {
        fetch(`http://localhost:5155/api/CustomerAccount/${accountNumber}/${customerId}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to get account details');
        })
        .then(data => {
            setAccountDetails(data);
            setGetAccountDetailsError(''); 
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            setAccountDetails(null); 
            setGetAccountDetailsError(error.message); 
        });
    };

    

    return (
        <div className="container d-flex justify-content-center align-items-center mt-lg-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title">Open Account</h5>
                            <label className='jj mb-2'>Select Account Type</label>
                            <select 
                                className="form-control" 
                                value={accountType} 
                                onChange={(e) => setAccountType(e.target.value)}
                            >
                                <option value="">Select</option>
                                {accountTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                            <br />
                            <label>Enter IFSC</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={ifsc} 
                                onChange={(e) => setIFSC(e.target.value)} 
                            />
                            <br />
                            <button className="btn buttons" onClick={handleOpenAccount}>Open Account</button>
                            <p>{openAccountStatus}</p>
                            <p>{openAccountError}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card h-100 ">
                        <div className="card-body">
                            <h5 className="card-title">Close Account</h5>
                            <label>Enter Account Number</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={accountNumberToClose} 
                                onChange={(e) => setAccountNumberToClose(e.target.value)} 
                            />
                            <br />
                            <button className="btn buttons" onClick={handleCloseAccount}>Close Account</button>
                            <p>{closeAccountStatus}</p>
                            <p>{closeAccountError}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-4">
                    <div className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">Get Account Details</h5>
                            <label>Enter Account Number</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={accountNumber} 
                                onChange={(e) => setAccountNumber(e.target.value)} 
                            />
                            <br />
                            <button className="btn buttons" onClick={handleGetAccountDetails}>Get Account Details</button>
                            <br />
                            <p>{getAccountDetailsError}</p>
                            {accountDetails && (
                                <div>
                                    <p>Account Number: {accountDetails.accountNumber}</p>
                                    <p>Balance: {accountDetails.balance}</p>
                                    <p>Account Type: {accountDetails.accountType}</p>
                                    <p>Status: {accountDetails.status}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-4">
                    <div className="card mb-2 ">
                        <div className="card-body">
                            <h5 className="card-title">Get Customer Accounts</h5>
                            {customerAccounts.length > 0 && (
                                <div>
                                    <h6 className="mt-3">Customer Accounts:</h6>
                                    {customerAccounts.map(account => (
                                        <div key={account.accountNumber}>
                                            <p>Account Number: {account.accountNumber}</p>
                                            <p>Balance: {account.balance}</p>
                                            <p>Account Type: {account.accountType}</p>
                                            <p>Status: {account.status}</p>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerAccount;

//mine

// import React, { useState } from 'react';

// function CustomerAccount() {
//     const [accountType, setAccountType] = useState('');
//     const [ifsc, setIFSC] = useState('');
//     const [customerID, setCustomerID] = useState('');
//     const [accountNumberToClose, setAccountNumberToClose] = useState('');
//     const [accountNumber, setAccountNumber] = useState('');
//     const [accountDetails, setAccountDetails] = useState(null);
//     const [customerAccounts, setCustomerAccounts] = useState([]);
//     const [openAccountStatus, setOpenAccountStatus] = useState('');
//     const [closeAccountStatus, setCloseAccountStatus] = useState('');

//     const [message,setMessage]=useState('');
//     const [message1,setMessage1]=useState('');

//     const handleOpenAccount = () => {
//         const requestBody = {
//             accountType: accountType,
//             ifsc: ifsc,
//             customerID: customerID
//         };

//         fetch('http://localhost:5155/api/CustomerAccount/Open%20Account', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestBody)
//         })
//             .then(response => {
//                 if (response.ok) {
//                     setOpenAccountStatus('Account opened successfully.');
//                     return response.json();
//                 }
//                 throw new Error('Network response was not ok.');
//             })
//             .then(data => { })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//                 setOpenAccountStatus('Failed to open account.');
//             });
//     };

//     const handleCloseAccount = () => {

       
//         fetch(`http://localhost:5155/api/CustomerAccount/Close%20Account?accountNumber=${accountNumberToClose}`, {
//             method: 'POST',
//             headers: {
//                 'accept': 'text/plain'
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     setCloseAccountStatus('Account closed successfully.');
//                     return response.text();
//                 }
//                 throw new Error('Network response was not ok.');
//             })
//             .then(data => { })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//                 setCloseAccountStatus('Failed to close account.');
//             });
//     };

//     const handleGetAccountDetails = () => {
//         fetch(`http://localhost:5155/api/CustomerAccount/GetAccountDetailsByAccountNumber?accountNumber=${accountNumber}`, {
//             method: 'GET',
//             headers: {
//                 'accept': 'application/json'
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 throw new Error('Network response was not ok.');
//             })
//             .then(data => {
//                 setAccountDetails(data);
//                 setMessage('');
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//                 setMessage('Account Number not available');
//             });
//     };

//     const handleGetCustomerAccounts = () => {
//         fetch(`http://localhost:5155/api/CustomerAccount/GetAccountDetailsByCustomerId?customerId=${customerID}`, {
//             method: 'GET',
//             headers: {
//                 'accept': 'application/json'
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 throw new Error('Network response was not ok.');
//             })
//             .then(data => {
//                 setCustomerAccounts(data);
//                 setMessage1('');
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//                 setMessage1('Customer ID not found');
//             });
//     };

//     return (
//         // <div className="container d-flex justify-content-center align-items-center vh-100 mt-lg-5 ">
//         <div className="container d-flex justify-content-center align-items-center flex-column mt-lg-5 ">
//             <div className="row ">
//                 <div className="col-md-6 ">
//                     <div className="card ">
//                         <div className="card-body">
//                             <h5 className="card-title">Open Account</h5>
//                             <label>Enter Account Type</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={accountType}
//                                 onChange={(e) => setAccountType(e.target.value)}
//                             />
//                             <br />
//                             <label>Enter IFSC</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={ifsc}
//                                 onChange={(e) => setIFSC(e.target.value)}
//                             />
//                             <br />
//                             <label>Enter Customer Id</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={customerID}
//                                 onChange={(e) => setCustomerID(e.target.value)}
//                             />
//                             <br />
//                             {/* <button className="btn buttons card-title" onClick={handleOpenAccount}>Open Account</button> */}
//                             <button
//                                 className="btn buttons card-title"
//                                 onClick={handleOpenAccount}
//                                 style={{ fontSize: '20px', padding: '5px 10px' }}
//                             >
//                                 Open Account
//                             </button>
//                             <p>{openAccountStatus}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-6">
//                     <div className="card h-100 ">
//                         <div className="card-body">
//                             <h5 className="card-title">Close Account</h5>
//                             <label>Enter Account Number</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={accountNumberToClose}
//                                 onChange={(e) => setAccountNumberToClose(e.target.value)}
//                             />
//                             <br />
//                             {/* <button className="btn buttons" onClick={handleCloseAccount}>Close Account</button> */}
//                             <button
//                                 className="btn buttons card-title"
//                                 onClick={handleCloseAccount}
//                                 style={{ fontSize: '20px', padding: '5px 10px' }}
//                             >
//                                 Close Account
//                             </button>

//                             <p>{closeAccountStatus}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-6 mt-4">
//                     <div className="card mb-2">
//                         <div className="card-body">
//                             <h5 className="card-title">Get Account Details</h5>
//                             <label>Enter Account Number</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={accountNumber}
//                                 onChange={(e) => setAccountNumber(e.target.value)}
//                             />
//                             <br />
//                             {/* <button className="btn buttons card-title" onClick={handleGetAccountDetails}>Get Account Details</button> */}
//                             <button
//                                 className="btn buttons card-title"
//                                 onClick={handleGetAccountDetails}
//                                 style={{ fontSize: '18px', padding: '10px 15px' }}
//                             >
//                                 Get Account Details
//                             </button>
//                             {message && <p>{message}</p>}

//                             <br />
//                             {accountDetails && (
//                                 <div>
//                                     <p>Account Number: {accountDetails.accountNumber}</p>
//                                     <p>Balance: {accountDetails.balance}</p>
//                                     <p>Account Type: {accountDetails.accountType}</p>
//                                     <p>Status: {accountDetails.status}</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-6 mt-4">
//                     <div className="card mb-2 ">
//                         <div className="card-body">
//                             <h5 className="card-title">Get Customer Accounts</h5>
//                             <label>Enter Customer Id</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={customerID}
//                                 onChange={(e) => setCustomerID(e.target.value)}
//                             />
//                             <br />
//                             {/* <button className="btn buttons card-title" onClick={handleGetCustomerAccounts}>Get Customer Accounts</button> */}
//                             <button
//                                 className="btn buttons card-title"
//                                 onClick={handleGetCustomerAccounts}
//                                 style={{ fontSize: '18px', padding: '10px 15px' }}
//                             >
//                                 Get Customer Accounts
//                             </button>
//                             {message1 && <p>{message1}</p>}

//                             <br />
//                             {customerAccounts.length > 0 && (
//                                 <div>
//                                     <h6 className="mt-3">Customer Accounts:</h6>
//                                     {customerAccounts.map(account => (
//                                         <div key={account.accountNumber}>
//                                             <p>Account Number: {account.accountNumber}</p>
//                                             <p>Balance: {account.balance}</p>
//                                             <p>Account Type: {account.accountType}</p>
//                                             <p>Status: {account.status}</p>
//                                             <hr />
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CustomerAccount;