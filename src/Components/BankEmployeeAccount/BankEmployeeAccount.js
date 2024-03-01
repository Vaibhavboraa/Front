


import React, { useState, useEffect } from 'react';
import '../BankEmployeeAccount/BankEmployeeAccount.css';

function BankEmployeeAccount() {
    const [customers, setCustomers] = useState([]);
    const [customerID, setCustomerID] = useState('');
    const [customerAccounts, setCustomerAccounts] = useState([]);
    const [messages, setMessages] = useState('');
    const [pendingDeletionAccounts, setPendingDeletionAccounts] = useState([]);
    const [pendingAccounts, setPendingAccounts] = useState([]);

    useEffect(() => {
        getAllCustomers();
    }, []);

    const handleCancel = () => {
        setCustomerID('');
        setCustomerAccounts([]);
        setMessages('');
        setPendingDeletionAccounts([]);
        setPendingAccounts([]);
        setCustomers([]);
    };

    const handleGetCustomerAccounts = () => {
        if (customerID === '') {
            setMessages('Field Cannot Be Empty');
            return;
        }
        fetch(`http://localhost:5155/api/CustomerAccount/GetAccountDetailsByCustomerId?customerId=${customerID}`)
            .then(response => response.json())
            .then(data => {
                setCustomerAccounts(data);
                setMessages('');
            })
            .catch(error => {
                console.error('Error fetching customer accounts:', error);
                setCustomerAccounts([]);
                setMessages('No Accounts for this ID');
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
            .then(data => setPendingAccounts(data))
            .catch(error => console.error('Error fetching pending accounts:', error));
    };

    const approvePendingDeletion = (accountNumber) => {
        const confirmClose = window.confirm('Are you sure you want to delete this account?');
        if (!confirmClose) {
            return;
        }
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
        const confirmClose = window.confirm('Are you sure you want to Approve this account?');
        if (!confirmClose) {
            return;
        }
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

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">All Customers</h5>
                            <div>
                                <button className="btn b mb-2 card-title"
                                    style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }} onClick={getAllCustomers}>Get All Customers</button>
                                <button className='btn cancelz card-title'
                                    style={{ fontSize: '14px', padding: '8px 32px', marginRight: '5px',  marginTop: '12px'  }}
                                    onClick={handleCancel}>Close</button>
                            </div>
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
            </div>






            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">Get Customer Accounts</h5>
                            <label>Select Customer ID</label>
                            <select
                                className="form-control"
                                value={customerID}
                                onChange={(e) => setCustomerID(e.target.value)}
                            >
                                <option value="">Select Customer ID</option>
                                {customers.map((customer) => (
                                    <option key={customer.customerID} value={customer.customerID}>
                                        {customer.customerID}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <div className='button-container'>
                                <button className="btn buttons card-title"
                                    style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                    onClick={handleGetCustomerAccounts}>Get Customer Accounts</button>
                                <button className='btn cancelz ll card-title'
                                    style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                    onClick={handleCancel}>Close</button>
                            </div>
                            {messages && <p>{messages}</p>}
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


            </div>






            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Pending Deletion Accounts</h5>
                            <div className='button-container'>
                                <button className="btn b mb-2 card-title"
                                    style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                    onClick={getPendingDeletionAccounts}>Get Pending Deletion Accounts</button>
                                <button
                                    className='btn cancelz lm card-title'
                                    style={{
                                        fontSize: '14px',
                                        padding: '8px 12px',
                                        marginRight: '5px',
                                        marginTop: '10px' 
                                    }}
                                    onClick={handleCancel}
                                >
                                    Close
                                </button>

                            </div>
                            <ul className="list-group">
                                {pendingDeletionAccounts.map(account => (
                                    <li key={account.accountNumber} className="list-group-item">
                                        <p>Account Number: {account.accountNumber}</p>
                                        <p>Balance: {account.balance}</p>
                                        <p>Account Type: {account.accountType}</p>
                                        <p>Status: {account.status}</p>
                                        <p>IFSC: {account.ifsc}</p>
                                        <p>CustomerID:{account.customerID}</p>
                                        <button className="btn b card-title" 
                                         style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                          onClick={() => approvePendingDeletion(account.accountNumber)}>Approve Deletion</button>
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
                            <div className='button-container'>
                                <button className="btn b card-title"
                                    style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                    onClick={getPendingAccounts}>Get Pending Accounts</button>
                                <button className='btn cancelz lm card-title'
                                    style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                    onClick={handleCancel}>Close</button>
                            </div>
                            <ul className="list-group">
                                {pendingAccounts.map(account => (
                                    <li key={account.accountNumber} className="list-group-item">
                                        <p>Account Number: {account.accountNumber}</p>
                                        <p>Balance: {account.balance}</p>
                                        <p>Account Type: {account.accountType}</p>
                                        <p>Status: {account.status}</p>
                                        <p>IFSC: {account.ifsc}</p>
                                        <p>CustomerID:{account.customerID}</p>
                                        <button className="btn b card-title"
                                         style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                                          onClick={() => approvePendingAccountCreation(account.accountNumber)}>Approve Creation</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankEmployeeAccount;


