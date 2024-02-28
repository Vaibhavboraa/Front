import React, { useState } from 'react';
import '../BankEmployeeTransaction/BankEmployeeTransaction.css'
function BankEmployeeTransaction() {
    const [accountNumber, setAccountNumber] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [totalInbound, setTotalInbound] = useState(null);
    const [totalOutbound, setTotalOutbound] = useState(null);
    const [allTransactions, setAllTransactions] = useState(null);
    const [message, setMessage] = useState('');
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');


    const handleInputChange = (event) => {
        setAccountNumber(event.target.value);
    };

    const fetchAllTransactions = () => {
        fetch(`http://localhost:5155/api/BankEmployeeTransaction/GetAllTransactions`)
            .then(response => response.json())
            .then(data => setAllTransactions(data))
            .catch(error => console.error('Error fetching all transactions:', error));
    };

    // const fetchTransactions = () => {
    //     fetch(`http://localhost:5155/api/BankEmployeeTransaction/GetTransactionByAccountNumber?accountNumber=${accountNumber}`)
    //         .then(response => response.json())
    //         .then(data => setTransactions(data))
    //         .catch(error => console.error('Error fetching transactions:', error));
    // };


    const fetchTransactions = () => {
        if (accountNumber === '') {
            setMessage('Account Number cannot be empty');
            return;
        }
        fetch(`http://localhost:5155/api/BankEmployeeTransaction/GetTransactionByAccountNumber?accountNumber=${accountNumber}`)
            .then(response => response.json())
            .then(data => {
                setTransactions(data)
                setMessage('');

            })
            .catch(error => {
                console.error('Error fetching transactions:', error)


                setTransactions('');
                setMessage('No transactions found for account number');
            }


            );
    };

  
    

    const fetchTotalInbound = () => {

        if (accountNumber === '') {
            setMessage1('Account Number cannot be empty');
            return;
        }
       
        fetch(`http://localhost:5155/api/BankEmployeeTransaction/TotalInbound?accountNumber=${accountNumber}`)
            .then(response => response.text())
            .then(data => setTotalInbound(data))
            .catch(error => console.error('Error fetching total inbound amount:', error));
    };

    const fetchTotalOutbound = () => {
        if (accountNumber === '') {
            setMessage2('Account Number cannot be empty');
            return;
        }
        fetch(`http://localhost:5155/api/BankEmployeeTransaction/TotalOutbound?accountNumber=${accountNumber}`)
            .then(response => response.text())
            .then(data => setTotalOutbound(data))
            .catch(error => console.error('Error fetching total outbound amount:', error));
    };

    const handleCancel = () => {

        setAllTransactions([]);
    };
  

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card kk mt-4  ">
                        <div className="card-body">
                            <h2 className='card-title'>Transaction Details</h2>
                            <label htmlFor="accountNumber">Account Number:</label>
                            <input
                                type="text"
                                id="accountNumber"
                                className="form-control"
                                value={accountNumber}
                                onChange={handleInputChange}
                            />
                            {/* <button onClick={fetchTransactions} className="btn xt mt-2 card-title">Fetch Transactions</button> */}
                            <button
                                onClick={fetchTransactions}
                                className="btn xt mt-2 card-title"
                                style={{
                                    fontSize: '16px',
                                    padding: '3px 8px',
                                }}
                            >
                                Fetch Transactions
                            </button>
                            {message && <p>{message}</p>}

                            <div>
                                {transactions && transactions.map && transactions.map(transaction => (
                                    <div key={transaction.transactionID}>
                                        <p>Transaction ID: {transaction.transactionID}</p>
                                        <p>Amount: {transaction.amount}</p>
                                        <p>Date: {transaction.transactionDate}</p>
                                        <p>Description: {transaction.description}</p>
                                        <p>Type: {transaction.transactionType}</p>
                                        <p>Status: {transaction.status}</p>
                                        <p>Source Account: {transaction.sourceAccountNumber}</p>
                                        <p>Destination Account: {transaction.destinationAccountNumber}</p>
                                        <hr />
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h2 className='card-title'>Total Inbound Amount</h2>
                            <label htmlFor="accountNumberTotal">Account Number:</label>
                            <input
                                type="text"
                                id="accountNumberTotal"
                                className="form-control"
                                value={accountNumber}
                                onChange={handleInputChange}
                            />
                            {/* <button onClick={fetchTotalInbound} className="btn xt mt-2 card-title">Fetch Total Inbound Amount</button> */}
                            <button
                                onClick={fetchTotalInbound}
                                className="btn xt mt-2 card-title"
                                style={{
                                    fontSize: '16px',
                                    padding: '3px 8px',
                                }}
                            >
                                Fetch Total Inbound Amount
                            </button>

                            {totalInbound && <p>Total Inbound Amount: {totalInbound}</p>}
                            {message1 && <p>{message1}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h2 className='card-title'>Total Outbound Amount</h2>
                            <label htmlFor="accountNumberOutbound">Account Number:</label>
                            <input
                                type="text"
                                id="accountNumberOutbound"
                                className="form-control"
                                value={accountNumber}
                                onChange={handleInputChange}
                            />
                            {/* <button onClick={fetchTotalOutbound} className="btn xt mt-2 card-title">Fetch Total Outbound Amount</button> */}
                            <button
                                onClick={fetchTotalOutbound}
                                className="btn xt mt-2 card-title"
                                style={{
                                    fontSize: '16px',
                                    padding: '3px 8px',
                                }}
                            >
                                Fetch Total Outbound Amount
                            </button>

                          
                           
                            {totalOutbound && <p>Total Outbound Amount: {totalOutbound}</p>}
                            {message2 && <p>{message2}</p>}
                          
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h2 className='card-title'>All Transactions</h2>
                            {/* <button onClick={fetchAllTransactions} className="btn xt card-title">Fetch All Transactions</button> */}
                            <button
                                onClick={fetchAllTransactions}
                                className="btn xt card-title"
                                style={{
                                    fontSize: '16px',
                                    padding: '3px 8px',
                                    marginRight: '10px',
                                }}
                            >
                                Fetch All Transactions
                            </button>
                            <button
                                onClick={handleCancel}
                                className="btn cancel card-title"
                                style={{
                                    fontSize: '16px',
                                    padding: '3px 18px',

                                }}
                            >
                                Cancel
                            </button>

                            {allTransactions && allTransactions.map(transaction => (
                                <div key={transaction.transactionID}>
                                    <p>Transaction ID: {transaction.transactionID}</p>
                                    <p>Amount: {transaction.amount}</p>
                                    <p>Date: {transaction.transactionDate}</p>
                                    <p>Description: {transaction.description}</p>
                                    <p>Type: {transaction.transactionType}</p>
                                    <p>Status: {transaction.status}</p>
                                    <p>Source Account: {transaction.sourceAccountNumber}</p>
                                    <p>Destination Account: {transaction.destinationAccountNumber}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankEmployeeTransaction;