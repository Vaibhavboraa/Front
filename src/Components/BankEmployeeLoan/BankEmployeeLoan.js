import React, { useState, useEffect } from 'react';
import '../BankEmployeeLoan/BankEmployeeLoan.css'

function BankEmployeeLoan() {
    const [loanId, setLoanId] = useState('');
    const [loanData, setLoanData] = useState(null);
    const [accountCredit, setAccountCredit] = useState({});
    const [approved, setApproved] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [disburseLoanId, setDisburseLoanId] = useState('');
    const [disburseAccountNumber, setDisburseAccountNumber] = useState('');
    const [allLoans, setAllLoans] = useState([]);
    const [message, setMessage] = useState("");
    const [message1, setMessage1] = useState('');
    const [disburseMessage, setDisburseMessage] = useState('');

    useEffect(() => {
        fetchAllLoans();
    }, []);

    const handleInputChange = (event) => {
        setLoanId(event.target.value);
    };

    const fetchAllLoans = () => {
        fetch(`http://localhost:5155/api/BankEmployeeLoan/GetAllLoans`, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setAllLoans(data))
            .catch(error => console.error('Error fetching all loans:', error));
    };

    const reviewLoanApplication = () => {

        if(loanId==='')
        {
           setMessage1('Loan ID cannot be empty');
           return;
        }
        fetch(`http://localhost:5155/api/BankEmployeeLoan/ReviewLoanApplication/${loanId}`)
            .then(response => response.json())
            .then(data => {
                setLoanData(data)
                setMessage1('');

            })
            .catch(error => {
                console.error('Error reviewing loan application:', error)
                setLoanData('');
                setMessage1('Loan not found ');
            });
    };

    const checkCredit = (accountNumber) => {
        fetch(`http://localhost:5155/api/BankEmployeeLoan/check-credit/${accountNumber}`)
            .then(response => response.json())
            .then(data => {
                setAccountCredit(prevState => ({
                    ...prevState,
                    [accountNumber]: data.value
                }));
            })
            .catch(error => console.error('Error checking credit:', error));
    };

    const makeLoanDecision = () => {

        if (loanId==='')
        {
            setMessage('Loan ID cannot be empty');
            return;
        }
        fetch(`http://localhost:5155/api/BankEmployeeLoan/MakeLoanDecision/${loanId}?approved=${approved}`, {
            method: 'POST',
            headers: {
                'accept': 'text/plain'
            }
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                //
                setMessage(data);

            })
            .catch(error => console.error('Error making loan decision:', error));
    };


    const disburseLoan = () => {
       
            fetch(`http://localhost:5155/api/BankEmployeeLoan/disburse-loan/${disburseLoanId}/${disburseAccountNumber}`, {
                method: 'POST',
                headers: {
                    'accept': 'text/plain'
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Loan disbursement failed');
                    }
                })
                .then(data => {
                    setDisburseMessage('Loan disbursed successfully');
                })
                .catch(error => {
                    setDisburseMessage('Error disbursing loan');
                    console.error('Error disbursing loan:', error);
                });
        
    };
    


    // const disburseLoan = () => {

    //     if (loanId === '' && disburseAccountNumber === '') {
    //         setDisburseMessage('Loan ID and Account Number cannot be empty');
    //     } else if (loanId === '') {
    //         setDisburseMessage('Loan ID cannot be empty');
    //     } else if (disburseAccountNumber === '') {
    //         setDisburseMessage('Account Number cannot be empty');
    //     }
    //     fetch(`http://localhost:5155/api/BankEmployeeLoan/disburse-loan/${disburseLoanId}/${disburseAccountNumber}`, {
    //         method: 'POST',
    //         headers: {
    //             'accept': 'text/plain'
    //         }
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 throw new Error('Loan disbursement failed');
    //             }
    //         })
    //         .then(data => {
    //             setDisburseMessage('Loan disbursed successfully');

    //         })
    //         .catch(error => {
    //             setDisburseMessage('Error disbursing loan');
    //             console.error('Error disbursing loan:', error);
    //         });
    // };




    // const disburseLoan = () => {
    //     fetch(`http://localhost:5155/api/BankEmployeeLoan/disburse-loan/${disburseLoanId}/${disburseAccountNumber}`, {
    //         method: 'POST',
    //         headers: {
    //             'accept': 'text/plain'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(error => console.error('Error disbursing loan:', error));
    // };




    return (
        <div className="container">
            <div className="card mt-4">
                <div className="card-body">
                    <h3 className='card-title'>All Loans</h3>
                    <ul className="list-group">
                        {allLoans.map(loan => (
                            <li key={loan.loanID} className="list-group-item">
                                Loan ID: {loan.loanID}, Loan Amount: {loan.loanAmount}, Status: {loan.status}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-body">
                    <h3 className='card-title'>Review Loan Application and Check Credit</h3>
                    <div className="form-group">
                        <label htmlFor="loanId">Loan ID:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="loanId"
                            value={loanId}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* <button className="btn x card-title" onClick={reviewLoanApplication}>Review Loan Application</button> */}
                    <button
                        onClick={reviewLoanApplication}
                        className="btn x card-title"
                        style={{ fontSize: '14px', padding: '8px 12px', marginRight: '5px' }}
                    >
                        Review Loan Application
                    </button>
                    {message1 && <p>{message1}</p>}


                    {loanData && (
                        <div className="mt-3">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className='card-title'>Loan Details</h4>
                                    <p>Loan ID: {loanData.loanID}</p>
                                    <p>Loan Amount: {loanData.loanAmount}</p>
                                    <p>Loan Type: {loanData.loanType}</p>
                                    <p>Interest: {loanData.interest}</p>
                                    <p>Tenure: {loanData.tenure}</p>
                                    <p>Purpose: {loanData.purpose}</p>
                                    <p>Status: {loanData.status}</p>
                                    <p>Customer ID: {loanData.customerID}</p>
                                    <div>
                                        <h5 className='card-title'>Customer Accounts</h5>
                                        <ul>
                                            {loanData.customers.accounts.map(account => (
                                                <li key={account.accountNumber}>
                                                    Account Number: {account.accountNumber}, Balance: {account.balance}
                                                    {/* <button onClick={() => checkCredit(account.accountNumber)}>Check Credit</button> */}
                                                    <button
                                                        onClick={() => checkCredit(account.accountNumber)}
                                                        className="btn card-title"
                                                        style={{ fontSize: '12px', padding: '8px 12px', marginLeft: '10px', marginTop: '10px' }}
                                                    >
                                                        Check Credit
                                                    </button>



                                                    <hr />
                                                    {accountCredit[account.accountNumber] && (
                                                        <div>
                                                            <p>Inbound Amount: {accountCredit[account.accountNumber].inboundAmount}</p>
                                                            <p>Outbound Amount: {accountCredit[account.accountNumber].outboundAmount}</p>
                                                            <p>Credit Score: {accountCredit[account.accountNumber].creditScore}</p>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-body">
                    <h3 className='card-title'>Make Loan Decision</h3>
                    <div className="form-group">
                        <label htmlFor="decisionLoanId">Loan ID:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="decisionLoanId"
                            value={loanId}
                            onChange={handleInputChange}
                        />
                    </div>

                    <label htmlFor="approved">Approved:</label>
                    <input
                        type="checkbox"
                        id="approved"
                        checked={approved}
                        onChange={() => {
                            setApproved(!approved);
                            if (rejected) setRejected(false);
                        }}
                    />
                    <label htmlFor="rejected">Rejected:</label>
                    <input
                        type="checkbox"
                        id="rejected"
                        checked={rejected}
                        onChange={() => {
                            setRejected(!rejected);
                            if (approved) setApproved(false);
                        }}
                    />
                    {/* <button className="btn x card-title" onClick={makeLoanDecision}>Make Loan Decision</button> */}
                    <button
                        className="btn x card-title"
                        onClick={makeLoanDecision}
                        style={{
                            fontSize: '14px',
                            padding: '5px 10px',
                            marginRight: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Make Loan Decision
                    </button>
                    {message && <p>{message}</p>}


                </div>
            </div>
                     
            <div className="card mt-3">
                <div className="card-body">
                    <h3 className='card-title'>Disburse Loan</h3>
                    <div className="form-group">
                        <label htmlFor="disburseLoanId">Loan ID:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="disburseLoanId"
                            value={disburseLoanId}
                            onChange={(e) => setDisburseLoanId(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="disburseAccountNumber">Account Number:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="disburseAccountNumber"
                            value={disburseAccountNumber}
                            onChange={(e) => setDisburseAccountNumber(e.target.value)}
                        />
                    </div>
                    {/* <button className="btn x card-title" onClick={disburseLoan}>Disburse Loan</button> */}
                    <button
                        className="btn x card-title"
                        onClick={disburseLoan}
                        style={{
                            fontSize: '16px',
                            padding: '3px 8px',
                        }}
                    >
                        Disburse Loan
                    </button>
                    {disburseMessage && <p>{disburseMessage}</p>}

                </div>
            </div>

            


        </div>
    );
}

export default BankEmployeeLoan;