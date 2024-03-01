import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../CustomerTransactions/CustomerTransactions.css';

function CustomerTransactions() {
    const [depositAccountNumber, setDepositAccountNumber] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAccountNumber, setWithdrawAccountNumber] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [transferSourceAccountNumber, setTransferSourceAccountNumber] = useState('');
    const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [depositMessage, setDepositMessage] = useState('');
    const [withdrawMessage, setWithdrawMessage] = useState('');
    const [transferMessage, setTransferMessage] = useState('');
    const customerId = sessionStorage.getItem('customerId');
    const token = sessionStorage.getItem('token');

    // const handleDeposit = () => {
    //     if(depositAccountNumber==='')
    //     {
    //         setDepositMessage('Account Number Cannot be empty');
    //         return;
    //     }
    //     if(depositAmount==='')
    //     {
    //         setDepositMessage('Amount cannot be empty');
    //         return;
    //     }
        
    //     const requestBody = {
    //         accountNumber: depositAccountNumber,
    //         amount: depositAmount
    //     };

    //     fetch(`http://localhost:5155/api/CustomerTransaction/deposit?customerId=${customerId}`, {
    //         method: 'POST',
    //         headers: {
    //             'accept': '/',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         },
    //         body: JSON.stringify(requestBody)
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw new Error('Network response was not ok.');
    //         }
    //     })
    //     .then(data => {
    //         setDepositMessage(data.message);
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with your fetch operation:', error);
    //     });
    // };

    const handleDeposit = () => {
      
        if (depositAccountNumber === '') {
            setDepositMessage('Account Number Cannot be empty');
            return;
        }
        if (depositAmount === '') {
            setDepositMessage('Amount cannot be empty');
            return;
        }

      
        const isConfirmed = window.confirm('Are you sure you want to make the deposit?');

      
        if (isConfirmed) {
            const requestBody = {
                accountNumber: depositAccountNumber,
                amount: depositAmount
            };

            fetch(`http://localhost:5155/api/CustomerTransaction/deposit?customerId=${customerId}`, {
                method: 'POST',
                headers: {
                    'accept': '/',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                setDepositMessage(data.message);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    };

    // const handleWithdraw = () => {

    //     if(withdrawAccountNumber==='')
    //     {
    //         setWithdrawMessage("Account Number cannot be empty");
    //         return;
    //     }
    //     if(withdrawAmount==='')
    //     {
    //         setWithdrawMessage('Amount cannot be null');
    //         return;
    //     }
    //     const requestBody = {
    //         accountNumber: withdrawAccountNumber,
    //         amount: withdrawAmount
    //     };

    //     fetch(`http://localhost:5155/api/CustomerTransaction/withdraw?customerId=${customerId}`, {
    //         method: 'POST',
    //         headers: {
    //             'accept': '/',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         },
    //         body: JSON.stringify(requestBody)
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw new Error('Network response was not ok.');
    //         }
    //     })
    //     .then(data => {
    //         setWithdrawMessage(data.message);
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with your fetch operation:', error);
    //     });
    // };

    const handleWithdraw = () => {
       
        if (withdrawAccountNumber === '') {
            setWithdrawMessage('Account Number Cannot be empty');
            return;
        }
        if (withdrawAmount === '') {
            setWithdrawMessage('Amount cannot be null');
            return;
        }

       
        const isConfirmed = window.confirm('Are you sure you want to make the withdrawal?');

  
        if (isConfirmed) {
            const requestBody = {
                accountNumber: withdrawAccountNumber,
                amount: withdrawAmount
            };

            fetch(`http://localhost:5155/api/CustomerTransaction/withdraw?customerId=${customerId}`, {
                method: 'POST',
                headers: {
                    'accept': '/',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                setWithdrawMessage(data.message);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    };

    // const handleTransfer = () => {
    //     if(transferSourceAccountNumber==='')
    //     {
    //         setTransferMessage("Account Number cannot be empty");
    //         return;
    //     }
    //     if(destinationAccountNumber==='')
    //     {
    //         setTransferMessage("Account Number cannot be empty");
    //         return;
    //     }
    //     if(transferAmount==='')
    //     {
    //         setTransferMessage('Amount cannot be null');
    //         return;
    //     }
    //     const requestBody = {
    //         sourceAccountNumber: transferSourceAccountNumber,
    //         destinationAccountNumber: destinationAccountNumber,
    //         amount: transferAmount
    //     };

    //     fetch(`http://localhost:5155/api/CustomerTransaction/transfer?customerId=${customerId}`, {
    //         method: 'POST',
    //         headers: {
    //             'accept': '/',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         },
    //         body: JSON.stringify(requestBody)
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw new Error('Network response was not ok.');
    //         }
    //     })
    //     .then(data => {
    //         setTransferMessage(data.message);
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with your fetch operation:', error);
    //     });
    // };

    const handleTransfer = () => {
        // Check if source account number, destination account number, and amount are not empty
        if (transferSourceAccountNumber === '') {
            setTransferMessage('Source Account Number cannot be empty');
            return;
        }
        if (destinationAccountNumber === '') {
            setTransferMessage('Destination Account Number cannot be empty');
            return;
        }
        if (transferAmount === '') {
            setTransferMessage('Amount cannot be null');
            return;
        }

        // Display confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to make the transfer?');

        // If user confirms, proceed with the transfer
        if (isConfirmed) {
            const requestBody = {
                sourceAccountNumber: transferSourceAccountNumber,
                destinationAccountNumber: destinationAccountNumber,
                amount: transferAmount
            };

            fetch(`http://localhost:5155/api/CustomerTransaction/transfer?customerId=${customerId}`, {
                method: 'POST',
                headers: {
                    'accept': '/',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                setTransferMessage(data.message);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    };

    return (
        <div className="container">
            <h2 className='heading card-title mt-4'>Customer Transactions</h2>
            <Link to="/customer/detailed-transactions" className="btn buttons divbuttons card-title " style={{fontSize: '16px', padding:'10px 15px'}}
            >Transactions History</Link>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Deposit</h5>
                    <div className="form-group">
                        <label>Account Number:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={depositAccountNumber} 
                            onChange={(e) => setDepositAccountNumber(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={depositAmount} 
                            onChange={(e) => setDepositAmount(e.target.value)} 
                        />
                    </div>
                    <button className="btn buttons card-title" 
                     style={{fontSize: '16px', padding:'10px 15px'}}
                      onClick={handleDeposit}>Deposit</button>
                    {depositMessage && <p className="mt-3">{depositMessage}</p>}
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Withdraw</h5>
                    <div className="form-group">
                        <label>Account Number:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={withdrawAccountNumber} 
                            onChange={(e) => setWithdrawAccountNumber(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={withdrawAmount} 
                            onChange={(e) => setWithdrawAmount(e.target.value)} 
                        />
                    </div>
                    <button className="btn buttons card-title"
                     style={{fontSize: '16px', padding:'10px 15px'}}
                      onClick={handleWithdraw}>Withdraw</button>
                    {withdrawMessage && <p className="mt-3">{withdrawMessage}</p>}
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Transfer</h5>
                    <div className="form-group">
                        <label>Source Account Number:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={transferSourceAccountNumber} 
                            onChange={(e) => setTransferSourceAccountNumber(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Destination Account Number:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={destinationAccountNumber} 
                            onChange={(e) => setDestinationAccountNumber(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={transferAmount} 
                            onChange={(e) => setTransferAmount(e.target.value)} 
                        />
                    </div>
                    <button className="btn buttons card-title"
                     style={{fontSize: '16px', padding:'10px 15px'}}
                      onClick={handleTransfer}>Transfer</button>
                    {transferMessage && <p className="mt-3">{transferMessage}</p>}
                </div>
            </div>
            
        </div>
    );
}

export default CustomerTransactions;

//mine
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../CustomerTransactions/CustomerTransactions.css'

// function CustomerTransactions() {
//     const [depositAccountNumber, setDepositAccountNumber] = useState('');
//     const [depositAmount, setDepositAmount] = useState('');
//     const [withdrawAccountNumber, setWithdrawAccountNumber] = useState('');
//     const [withdrawAmount, setWithdrawAmount] = useState('');
//     const [transferSourceAccountNumber, setTransferSourceAccountNumber] = useState('');
//     const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
//     const [transferAmount, setTransferAmount] = useState('');
//     const [depositMessage, setDepositMessage] = useState('');
//     const [withdrawMessage, setWithdrawMessage] = useState('');
//     const [transferMessage, setTransferMessage] = useState('');

//     const handleDeposit = () => {

//         if (depositAccountNumber==='')
//         {
//             setDepositMessage('Account number cannot be empty');
//             return;
//         }
//         if (depositAmount==='')
//         {
//             setDepositMessage('Amount cannot be empty');
//             return;
//         }
//         const requestBody = {
//             accountNumber: depositAccountNumber,
//             amount: depositAmount
//         };

//         fetch('http://localhost:5155/api/CustomerTransaction/deposit', {
            

        
//             method: 'POST',
//             headers: {
//                 'accept': '*/*',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestBody)
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Network response was not ok.');
//                 }
//             })
//             .then(data => {
//                 setDepositMessage(data.message);
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//             });
//     };

//     const handleWithdraw = () => {
        
//         if (withdrawAccountNumber==='')
//         {
//             setWithdrawMessage('Account number cannot be empty');
//             return;
//         }
//         if (withdrawAmount==='')
//         {
//             setWithdrawMessage('Amount cannot be empty');
//             return;
//         }
//         const requestBody = {
//             accountNumber: withdrawAccountNumber,
//             amount: withdrawAmount
//         };

//         fetch('http://localhost:5155/api/CustomerTransaction/withdraw', {
//             method: 'POST',
//             headers: {
//                 'accept': '*/*',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestBody)
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Network response was not ok.');
//                 }
//             })
//             .then(data => {
//                 setWithdrawMessage(data.message);
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//             });
//     };

//     const handleTransfer = () => {
//         const requestBody = {
//             sourceAccountNumber: transferSourceAccountNumber,
//             destinationAccountNumber: destinationAccountNumber,
//             amount: transferAmount
//         };

//         fetch('http://localhost:5155/api/CustomerTransaction/transfer', {
//             method: 'POST',
//             headers: {
//                 'accept': '*/*',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestBody)
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Network response was not ok.');
//                 }
//             })
//             .then(data => {
//                 setTransferMessage(data.message);
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//             });
//     };

//     return (
//         <div className="container">
//             <h2 className='heading card-title mt-4'>Customer Transactions</h2>
//             {/* <Link to="/customer/detailed-transactions" className="btn buttons divbuttons card-title">Transactions History</Link> */}
//             <Link to="/customer/detailed-transactions" className="btn buttons divbuttons card-title" style={{ fontSize: '20px', padding: '5px 10px' }}>
//                 Transactions History
//             </Link>

//             <div className="card mb-3">
//                 <div className="card-body">
//                     <h5 className="card-title">Deposit</h5>
//                     <div className="form-group">
//                         <label>Account Number:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={depositAccountNumber}
//                             onChange={(e) => setDepositAccountNumber(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Amount:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={depositAmount}
//                             onChange={(e) => setDepositAmount(e.target.value)}
//                         />
//                     </div>
//                     {/* <button className="btn buttons card-title" onClick={handleDeposit}>Deposit</button> */}
//                     <button className="btn buttons card-title" onClick={handleDeposit} style={{ fontSize: '20px', padding: '5px 10px' }}>
//                         Deposit
//                     </button>

//                     {depositMessage && <p className="mt-3">{depositMessage}</p>}
//                 </div>
//             </div>

//             <div className="card mb-3">
//                 <div className="card-body">
//                     <h5 className="card-title">Withdraw</h5>
//                     <div className="form-group">
//                         <label>Account Number:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={withdrawAccountNumber}
//                             onChange={(e) => setWithdrawAccountNumber(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Amount:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={withdrawAmount}
//                             onChange={(e) => setWithdrawAmount(e.target.value)}
//                         />
//                     </div>
//                     {/* <button className="btn buttons" onClick={handleWithdraw}>Withdraw</button> */}
//                     <button className="btn buttons card-title" onClick={handleWithdraw} style={{ fontSize: '20px', padding: '5px 10px' }}>
//                         Withdraw
//                     </button>

//                     {withdrawMessage && <p className="mt-3">{withdrawMessage}</p>}
//                 </div>
//             </div>

//             <div className="card mb-3">
//                 <div className="card-body">
//                     <h5 className="card-title">Transfer</h5>
//                     <div className="form-group">
//                         <label>Source Account Number:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={transferSourceAccountNumber}
//                             onChange={(e) => setTransferSourceAccountNumber(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Destination Account Number:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={destinationAccountNumber}
//                             onChange={(e) => setDestinationAccountNumber(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Amount:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={transferAmount}
//                             onChange={(e) => setTransferAmount(e.target.value)}
//                         />
//                     </div>
//                     {/* <button className="btn buttons card-title" onClick={handleTransfer}>Transfer</button> */}
//                     <button className="btn buttons card-title" onClick={handleTransfer} style={{ fontSize: '20px', padding: '5px 10px' }}>
//                         Transfer
//                     </button>


//                     {transferMessage && <p className="mt-3">{transferMessage}</p>}
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default CustomerTransactions;