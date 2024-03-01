// import React, { useState } from 'react';
// import '../Transactions/Transaction.css';

// function DetailedTransactions() {
//     const [accountNumber, setAccountNumber] = useState('');
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [transactions, setTransactions] = useState([]);
//     const [last10Transactions, setLast10Transactions] = useState([]);
//     const [lastMonthTransactions, setLastMonthTransactions] = useState([]);

//     const [fetchError, setFetchError] = useState('');

//     const fetchTransactionsBetweenDates = async () => {
//         try {
//             const formattedStartDate = startDate.toISOString().split('T')[0];
//             const formattedEndDate = endDate.toISOString().split('T')[0];
//             const response = await fetch(`http://localhost:5155/api/CustomerTransaction/Transactions Between Dates?accountNumber=${accountNumber}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             });
//             const data = await response.json();
//             setTransactions(data);
//             setFetchError(null);
//         } catch (error) {
//             console.error('Error fetching transactions between dates:', error);
//             setFetchError('No Transactions Found');
//         }
//     };

//     const fetchLast10Transactions = async () => {
//         try {
//             const response = await fetch(`http://localhost:5155/api/CustomerTransaction/Last 10 Transactions?accountNumber=${accountNumber}`, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             });
//             const data = await response.json();
//             setLast10Transactions(data);
//         } catch (error) {
//             console.error('Error fetching last 10 transactions:', error);
//         }
//     };

//     const fetchLastMonthTransactions = async () => {
//         try {
//             const response = await fetch(`http://localhost:5155/api/CustomerTransaction/Last Month Transactions?accountNumber=${accountNumber}`, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             });
//             const data = await response.json();
//             setLastMonthTransactions(data);
//         } catch (error) {
//             console.error('Error fetching last month transactions:', error);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col mt-4">
//                     <div className='card'>
//                         <div className="transactions-section">
//                             <h2 className="card-title">Transactions Between Dates</h2>
//                             <div className="input-group">
//                                 <label className='labels'>Account Number:</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Account Number"
//                                     value={accountNumber}
//                                     onChange={(e) => setAccountNumber(e.target.value)}
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <label className='labels'>Start Date:</label>
//                                 <input
//                                     type="date"
//                                     placeholder="Start Date"
//                                     value={startDate.toISOString().split('T')[0]}
//                                     onChange={(e) => setStartDate(new Date(e.target.value))}
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <label className='labels'>End Date:</label>
//                                 <input
//                                     type="date"
//                                     placeholder="End Date"
//                                     value={endDate.toISOString().split('T')[0]}
//                                     onChange={(e) => setEndDate(new Date(e.target.value))}
//                                 />
//                             </div>
//                             {/* <button className="btn buttons card-title" onClick={fetchTransactionsBetweenDates}>Fetch Transactions</button> */}
//                             <button
//                                 onClick={fetchTransactionsBetweenDates}
//                                 className="btn buttons card-title"
//                                 style={{ fontSize: '14px', padding: '10px 15px' }}
//                             >
//                                 Fetch Transactions
//                             </button>

//                             <div className="transactions-list">
//                                 {/* {transactions.map(transaction => (
//                                     <div key={transaction.transactionID} className="card">
//                                         <div className="card-body">
//                                             <h5 className="card-title">Transaction ID: {transaction.transactionID}</h5>
//                                             <p className="card-text">Amount: {transaction.amount}</p><hr />
//                                             <p className="card-text">Transaction Date: {transaction.transactionDate}</p><hr />
//                                             <p className="card-text">Description: {transaction.description}</p><hr />
//                                             <p className="card-text">Transaction Type: {transaction.transactionType}</p><hr />
//                                             <p className="card-text">Status: {transaction.status}</p><hr />
//                                             <p className="card-text">Source Account Number: {transaction.sourceAccountNumber}</p><hr />
//                                             <p className="card-text">Destination Account Number: {transaction.destinationAccountNumber}</p><hr />
//                                         </div>
//                                     </div>
//                                 ))} */}
//                                 {Array.isArray(transactions) ? (
//                                     transactions.map((transaction) => (
//                                         <div key={transaction.transactionID} className="card">
//                                             <div className="card-body">
//                                                 <h5 className="card-title">Transaction ID: {transaction.transactionID}</h5>
//                                                 <p className="card-text">Amount: {transaction.amount}</p><hr />
//                                                 <p className="card-text">Transaction Date: {transaction.transactionDate}</p><hr />
//                                                 <p className="card-text">Description: {transaction.description}</p><hr />
//                                                 <p className="card-text">Transaction Type: {transaction.transactionType}</p><hr />
//                                                 <p className="card-text">Status: {transaction.status}</p><hr />
//                                                 <p className="card-text">Source Account Number: {transaction.sourceAccountNumber}</p><hr />
//                                                 <p className="card-text">Destination Account Number: {transaction.destinationAccountNumber}</p><hr />
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No transactions available.</p>
//                                 )}

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col mt-4">
//                     <div className='card'>
//                         <div className="transactions-section">
//                             <h2 className="card-title">Last 10 Transactions</h2>
//                             <label className='labels'>Account Number:</label>
//                             <input
//                                 type="text"
//                                 placeholder="Account Number"
//                                 value={accountNumber}
//                                 onChange={(e) => setAccountNumber(e.target.value)}
//                             />
//                             {/* <button className="btn buttons card-title" onClick={fetchLast10Transactions}>Fetch Last 10 Transactions</button> */}
//                             <button
//                                 onClick={fetchLast10Transactions}
//                                 className="btn buttons card-title"
//                                 style={{ fontSize: '14px', padding: '10px 15px' }}
//                             >
//                                 Fetch Last 10 Transactions
//                             </button>

//                             <div className="transactions-list">
//                                 {Array.isArray(last10Transactions) && last10Transactions.length > 0 ? (
//                                     last10Transactions.map(transaction => (
//                                         <div key={transaction.transactionID} className="card">
//                                             <div className="card-body">
//                                                 <h5 className="card-title">Transaction ID: {transaction.transactionID}</h5>
//                                                 <p className="card-text">Amount: {transaction.amount}</p><hr />
//                                                 <p className="card-text">Transaction Date: {transaction.transactionDate}</p><hr />
//                                                 <p className="card-text">Description: {transaction.description}</p><hr />
//                                                 <p className="card-text">Transaction Type: {transaction.transactionType}</p><hr />
//                                                 <p className="card-text">Status: {transaction.status}</p><hr />
//                                                 <p className="card-text">Source Account Number: {transaction.sourceAccountNumber}</p><hr />
//                                                 <p className="card-text">Destination Account Number: {transaction.destinationAccountNumber}</p><hr />
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No transactions available.</p>
//                                 )}

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col mt-4">
//                     <div className='card'>
//                         <div className="transactions-section">
//                             <h2 className="card-title">Last Month Transactions</h2>
//                             <label className='labels'>Account Number:</label>
//                             <input
//                                 type="text"
//                                 placeholder="Account Number"
//                                 value={accountNumber}
//                                 onChange={(e) => setAccountNumber(e.target.value)}
//                             />
//                             {/* <button className="btn buttons card-title" onClick={fetchLastMonthTransactions}>Fetch Last Month Transactions</button> */}
//                             <button
//                                 onClick={fetchLastMonthTransactions}
//                                 className="btn buttons card-title"
//                                 style={{ fontSize: '14px', padding: '10px 15px' }}
//                             >
//                                 Fetch Last Month Transactions
//                             </button>

//                             <div className="transactions-list">
//                                 {Array.isArray(lastMonthTransactions) && lastMonthTransactions.length > 0 ? (
//                                     lastMonthTransactions.map(transaction => (
//                                         <div key={transaction.transactionID} className="card">
//                                             <div className="card-body">
//                                                 <h5 className="card-title">Transaction ID: {transaction.transactionID}</h5>
//                                                 <p className="card-text">Amount: {transaction.amount}</p><hr />
//                                                 <p className="card-text">Transaction Date: {transaction.transactionDate}</p><hr />
//                                                 <p className="card-text">Description: {transaction.description}</p><hr />
//                                                 <p className="card-text">Transaction Type: {transaction.transactionType}</p><hr />
//                                                 <p className="card-text">Status: {transaction.status}</p><hr />
//                                                 <p className="card-text">Source Account Number: {transaction.sourceAccountNumber}</p><hr />
//                                                 <p className="card-text">Destination Account Number: {transaction.destinationAccountNumber}</p><hr />
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No transactions available.</p>
//                                 )}

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DetailedTransactions;



//vat



import React, { useState, useEffect } from 'react';
import '../Transactions/Transaction.css';

function DetailedTransactions() {
    const [customerId, setCustomerId] = useState('');
    const [customerAccounts, setCustomerAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [transactions, setTransactions] = useState([]);
    const [last10Transactions, setLast10Transactions] = useState([]);
    const [lastMonthTransactions, setLastMonthTransactions] = useState([]);
    const token = sessionStorage.getItem('token');
    const [err, setErr] = useState('');
    const [err1, setErr1] = useState('');
    const [err2, setErr2] = useState('');

    useEffect(() => {
        const storedCustomerId = sessionStorage.getItem('customerId');
        if (storedCustomerId) {
            setCustomerId(storedCustomerId);
            fetchCustomerAccounts(storedCustomerId);
        }
    }, []);

    const fetchCustomerAccounts = (customerId) => {
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
                throw new Error('Failed to fetch customer accounts');
            })
            .then(data => {
                setCustomerAccounts(Array.isArray(data) ? data : []);
                setErr('');
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                setCustomerAccounts([]);
                setErr('No Accounts Found');
            });
    };

    const handleAccountChange = (event) => {
        setSelectedAccount(event.target.value);
        setAccountNumber(event.target.value);
    };

    const handleCancel = () => {
        setTransactions([]);
        setErr('');
        setLast10Transactions([]);
        setErr1('');
        setLastMonthTransactions([]);
        setErr2('');
    };

    const fetchTransactionsBetweenDates = () => {

        if (!accountNumber || !startDate || !endDate) {
            setErr('Please fill in all fields');
            return;
        }


        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        console.log('Account Number:', accountNumber);
        console.log('Start Date:', formattedStartDate);
        console.log('End Date:', formattedEndDate);

        fetch(`http://localhost:5155/api/CustomerTransaction/TransactionsBetweenDates?accountNumber=${accountNumber}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setTransactions(data);
                setErr('');
            })
            .catch(error => {
                console.error('Error fetching transactions between dates:', error);
                setErr('Error fetching transactions between dates. Please try again later.');
            });
    };

    const fetchLast10Transactions = () => {
        if (!accountNumber) {
            setErr1('Please provide an account number');
            return;
        }

        fetch(`http://localhost:5155/api/CustomerTransaction/Last 10 Transactions?accountNumber=${accountNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setLast10Transactions(data);
                setErr1('');
            })
            .catch(error => {
                console.error('Error fetching last 10 transactions:', error);
                setLast10Transactions([]);
                setErr1('No transactions found');
            });
    };

    const fetchLastMonthTransactions = () => {
        if (!accountNumber) {
            setErr2('Please provide an account number');
            return;
        }

        fetch(`http://localhost:5155/api/CustomerTransaction/Last Month Transactions?accountNumber=${accountNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setLastMonthTransactions(data);
                setErr2('');
            })
            .catch(error => {
                console.error('Error fetching last month transactions:', error);
                setLastMonthTransactions([]);
                setErr2('No transactions for last month');
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col mt-4">
                    <div className='card'>
                        <div className="transactions-section">
                            <h2 className="card-title">Transactions Between Dates</h2>
                            <div className="input-group">
                                <label className='labels' style={{ fontWeight: 'bold' }}>Account Number:</label>
                                <select value={selectedAccount} onChange={handleAccountChange}>
                                    <option value="">Select Account</option>
                                    {customerAccounts.map(account => (
                                        <option key={account.accountNumber} value={account.accountNumber}>
                                            {account.accountNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label className='labels'>Start Date:</label>
                                <input
                                    type="date"
                                    value={startDate.toISOString().split('T')[0]}
                                    onChange={(e) => setStartDate(new Date(e.target.value))}
                                />
                            </div>
                            <div className="input-group">
                                <label className='labels'>End Date:</label>
                                <input
                                    type="date"
                                    value={endDate.toISOString().split('T')[0]}
                                    onChange={(e) => setEndDate(new Date(e.target.value))}
                                />
                            </div>
                            <div className='button-container'>
                                <button
                                    className="btn buttons card-title"
                                    style={{ fontSize: '14px', padding: '10px 15px' }}
                                    onClick={fetchTransactionsBetweenDates}
                                >
                                    Fetch Transactions
                                </button>
                                <button
                                    className='btn cancel qw'
                                    style={{ marginLeft: '10px', marginTop: '-20px' }}
                                    onClick={handleCancel}
                                >
                                    Close
                                </button>
                            </div>

                            {err && <p>{err}</p>}
                            <div className="transactions-list">
                                {transactions.map(transaction => (
                                    <div key={transaction.transactionID} className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Transaction ID: {transaction.transactionID}</h5>
                                            <p className="card-text">Amount: {transaction.amount}</p><hr />
                                            <p className="card-text">Transaction Date: {transaction.transactionDate}</p><hr />
                                            <p className="card-text">Description: {transaction.description}</p><hr />
                                            <p className="card-text">Transaction Type: {transaction.transactionType}</p><hr />
                                            <p className="card-text">Status: {transaction.status}</p><hr />
                                            <p className="card-text">Source Account Number: {transaction.sourceAccountNumber}</p><hr />
                                            <p className="card-text">Destination Account Number: {transaction.destinationAccountNumber}</p><hr />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col mt-4">
                    <div className='card'>
                        <div className="transactions-section">
                            <h2 className="card-title">Last 10 Transactions</h2>
                            <div className="input-group">
                                <label className='labels' style={{ fontWeight: 'bold' }}>Account Number:</label>
                                <select value={selectedAccount} onChange={handleAccountChange}>
                                    <option value="">Select Account</option>
                                    {customerAccounts.map(account => (
                                        <option key={account.accountNumber} value={account.accountNumber}>
                                            {account.accountNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='button-container'>
                                <div className='button-container'>
                                    <button
                                        className="btn buttons card-title"
                                        style={{ fontSize: '14px', padding: '10px 15px', marginTop: '30px' }}
                                        onClick={fetchLast10Transactions}
                                    >
                                        Fetch Last 10 Transactions
                                    </button>
                                    <button
                                        className='btn cancel qe'
                                        style={{ marginLeft: '10px', marginTop: '12px' }}
                                        onClick={handleCancel}
                                    >
                                        Close
                                    </button>
                                </div>

                            </div>
                            {err1 && <p>{err1}</p>}
                            <div className="transactions-list">
                                {last10Transactions.map(transaction => (
                                    <div key={transaction.transactionID} className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Transaction ID: {transaction.transactionID}</h5>
                                            <p className="card-text">Amount: {transaction.amount}</p><hr />
                                            <p className="card-text">Transaction Date: {transaction.transactionDate}</p><hr />
                                            <p className="card-text">Description: {transaction.description}</p><hr />
                                            <p className="card-text">Transaction Type: {transaction.transactionType}</p><hr />
                                            <p className="card-text">Status: {transaction.status}</p><hr />
                                            <p className="card-text">Source Account Number: {transaction.sourceAccountNumber}</p><hr />
                                            <p className="card-text">Destination Account Number: {transaction.destinationAccountNumber}</p><hr />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col mt-4">
                    <div className='card'>
                        <div className="transactions-section">
                            <h2 className="card-title">Last Month Transactions</h2>
                            <div className="input-group">
                                <label className='labels' style={{ fontWeight: 'bold' }}>Account Number:</label>
                                <select value={selectedAccount} onChange={handleAccountChange}>
                                    <option value="">Select Account</option>
                                    {customerAccounts.map(account => (
                                        <option key={account.accountNumber} value={account.accountNumber}>
                                            {account.accountNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='button-container'>
                                <div className='button-container'>
                                    <button
                                        className="btn buttons card-title"
                                        style={{ fontSize: '14px', padding: '10px 15px', marginTop: '30px' }}
                                        onClick={fetchLastMonthTransactions}
                                    >
                                        Fetch Last Month Transactions
                                    </button>
                                    <button
                                        className='btn cancel qr'
                                        style={{ marginLeft: '10px', marginTop: '10px' }}
                                        onClick={handleCancel}
                                    >
                                        Close
                                    </button>
                                </div>

                            </div>
                            {err2 && <p>{err2}</p>}
                            <div className="transactions-list">
                                {lastMonthTransactions.map(transaction => (
                                    <div key={transaction.transactionID} className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Transaction ID: {transaction.transactionID}</h5>
                                            <p className="card-text">Amount: {transaction.amount}</p><hr />
                                            <p className="card-text">Transaction Date: {transaction.transactionDate}</p><hr />
                                            <p className="card-text">Description: {transaction.description}</p><hr />
                                            <p className="card-text">Transaction Type: {transaction.transactionType}</p><hr />
                                            <p className="card-text">Status: {transaction.status}</p><hr />
                                            <p className="card-text">Source Account Number: {transaction.sourceAccountNumber}</p><hr />
                                            <p className="card-text">Destination Account Number: {transaction.destinationAccountNumber}</p><hr />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedTransactions;
