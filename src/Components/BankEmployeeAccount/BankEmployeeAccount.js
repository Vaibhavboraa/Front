import React, { useState } from 'react';
import '../BankEmployeeAccount/BankEmployeeAccount.css';

function BankEmployeeAccount() {
    const [customers, setCustomers] = useState([]);
    const [pendingDeletionAccounts, setPendingDeletionAccounts] = useState([]);
    const [pendingAccounts, setPendingAccounts] = useState([]);
    const [accountNumberForApproval, setAccountNumberForApproval] = useState('');
    const [customerID, setCustomerID] = useState('');
    const [customerAccounts, setCustomerAccounts] = useState([]);
    const [customerDetails, setCustomerDetails] = useState(null);
    const [message, setMessage] = useState('');
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    const [message3, setMessage3] = useState('');

    const handleGetCustomerAccounts = () => {
        if (customerID === '') {
            setMessage('Feild cannot be empty');
            return;
        }
        fetch(`http://localhost:5155/api/CustomerAccount/GetAccountDetailsByCustomerId?customerId=${customerID}`)
            .then(response => response.json())
            .then(data => {
                setCustomerAccounts(data);
                setMessage('');

            })
            .catch(error => {
                console.error('Error fetching customer accounts:', error)
                setCustomerAccounts('');
                setMessage('No Customer found with this ID');
            });
    };




    const getCustomerById = () => {
        if (customerID === '') {
            setMessage1('Feild cannot be empty');
            return;
        }
        fetch(`http://localhost:5155/api/BankEmployeeAccount/GetCustomerById?id=${customerID}`)
            .then(response => response.json())
            .then(data => {
                setCustomerDetails(data)
                setMessage1('');
            })
            .catch(error => {
                console.error('Error fetching customer details:', error)
                setCustomerDetails('');
                setMessage1("No customer found with this ID");
            });
    };

    const getAllCustomers = () => {
        fetch('http://localhost:5155/api/BankEmployeeAccount/GetAllCustomer')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    };

    const getPendingDeletionAccounts = () => {
        fetch('http://localhost:5155/api/BankEmployeeAccount/GetPendingDeletion')
            .then(response => response.json())
            .then(data => setPendingDeletionAccounts(data))
            .catch(error => console.error('Error fetching pending deletion accounts:', error));
    };

    const getPendingAccounts = () => {
        fetch('http://localhost:5155/api/BankEmployeeAccount/GetPendingAccounts')
            .then(response => response.json())
            .then(data => {
                setPendingAccounts(data)
                setMessage2('');


            })
            .catch(error => {
                console.error('Error fetching pending accounts:', error)

                setPendingAccounts('');
                setMessage2('No Pending Accounts');
            });
    };





    const approvePendingDeletion = (accountNumber) => {
        fetch(`http://localhost:5155/api/BankEmployeeAccount/ApproveAccountDeletion?accountNumber=${accountNumber}`, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                getPendingDeletionAccounts();
            })
            .catch(error => console.error('Error approving account deletion:', error));
    };

    const approvePendingAccountCreation = (accountNumber) => {
        fetch(`http://localhost:5155/api/BankEmployeeAccount/ApproveAccountCreation?accountNumber=${accountNumber}`, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                getPendingAccounts();
            })
            .catch(error => console.error('Error approving account creation:', error));
    };

    const handleClose = () => {

        setCustomers([]);
    };

  

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">All Customers</h5>
                            {/* <button className="btn b mb-2 card-title" onClick={getAllCustomers}>Get All Customers</button> */}
                            <button
                                onClick={getAllCustomers}
                                className="btn b mb-2 card-title"
                                style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                            >
                                Get All Customers
                            </button>
                            <button
                                onClick={handleClose}
                                className="btn cancel mb-2 card-title"
                                style={{ fontSize: '14px', padding: '8px 12px' }}
                            >
                                Close
                            </button>

                            <ul className="list-group">
                                {customers.map(customer => (
                                    <li key={customer.customerID} className="list-group-item">
                                        <p>Customer ID: {customer.customerID}</p>
                                        <p>Name: {customer.name}</p>
                                        <p>Date of Birth: {customer.dob}</p>
                                        <p>Phone Number: {customer.phoneNumber}</p>
                                        <p>Email: {customer.email}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 mt-4">
                    <div className="card mb-2 ">
                        <div className="card-body">
                            <h5 className="card-title">Get Customer Accounts</h5>
                            <label>Enter Customer Id</label>
                            <input
                                type="text"
                                className="form-control"
                                value={customerID}
                                onChange={(e) => setCustomerID(e.target.value)}
                            />
                            <br />
                            {/* <button className="btn buttons card-title" onClick={handleGetCustomerAccounts}>Get Customer Accounts</button> */}
                            <button
                                onClick={handleGetCustomerAccounts}
                                className="btn buttons card-title"
                                style={{ fontSize: '14px', padding: '10px 15px', marginRight: '20px' }}
                            >
                                Get Customer Accounts
                            </button>
                         
                            

                            {
                                message && <p> {message}</p>
                            }


                            <br />
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

                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card mt-4">
                            <div className="card-body">
                                <h5 className="card-title">Get Customer By ID</h5>
                                <label>Enter Customer ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={customerID}
                                    onChange={(e) => setCustomerID(e.target.value)}
                                />
                                <br />
                                {/* <button className="btn buttons card-title" onClick={getCustomerById}>Get Customer Details</button> */}
                                <button
                                    onClick={getCustomerById}
                                    className="btn buttons card-title"
                                    style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                >
                                    Get Customer Details
                                </button>
                                {message1 && <p>{message1}</p>}

                                <br />
                                {customerDetails && (
                                    <div>
                                        <h6 className="mt-3">Customer Details:</h6>
                                        <p>Customer ID: {customerDetails.customerID}</p>
                                        <p>Name: {customerDetails.name}</p>
                                        <p>Date of Birth: {customerDetails.dob}</p>
                                        <p>Phone Number: {customerDetails.phoneNumber}</p>
                                        <p>Email: {customerDetails.email}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Pending Deletion Accounts</h5>
                            {/* <button className="btn b mb-2 card-title" onClick={getPendingDeletionAccounts}>Get Pending Deletion Accounts</button> */}
                            <button
                                onClick={getPendingDeletionAccounts}
                                className="btn b mb-2 card-title"
                                style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                            >
                                Get Pending Deletion Accounts
                            </button>


                            <ul className="list-group">
                                {pendingDeletionAccounts.map(account => (
                                    <li key={account.accountNumber} className="list-group-item">
                                        <p>Account Number: {account.accountNumber}</p>
                                        <p>Balance: {account.balance}</p>
                                        <p>Account Type: {account.accountType}</p>
                                        <p>Status: {account.status}</p>
                                        <p>IFSC: {account.ifsc}</p>
                                        {/* <button className="btn b card-title" onClick={() => approvePendingDeletion(account.accountNumber)}>Approve Deletion</button> */}
                                        <button
                                            onClick={() => approvePendingDeletion(account.accountNumber)}
                                            className="btn b card-title"
                                            style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                        >
                                            Approve Deletion
                                        </button>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Pending Accounts</h5>
                            {/* <button className="btn b card-title" onClick={getPendingAccounts}>Get Pending Accounts</button> */}
                            <button
                                onClick={getPendingAccounts}
                                className="btn b card-title"
                                style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                            >
                                Get Pending Accounts
                            </button>

                            {message2 && <p>{message2}</p>}


                            <ul className="list-group">
                                {pendingAccounts.map(account => (
                                    <li key={account.accountNumber} className="list-group-item">
                                        <p>Account Number: {account.accountNumber}</p>
                                        <p>Balance: {account.balance}</p>
                                        <p>Account Type: {account.accountType}</p>
                                        <p>Status: {account.status}</p>
                                        <p>IFSC: {account.ifsc}</p>
                                        {/* <button className="btn b card-title" onClick={() => approvePendingAccountCreation(account.accountNumber)}>Approve Creation</button> */}
                                        <button
                                            onClick={() => approvePendingAccountCreation(account.accountNumber)}
                                            className="btn b card-title"
                                            style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                        >
                                            Approve Creation
                                        </button>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Section for Customer Details */}

        </div>
    );
}

export default BankEmployeeAccount;