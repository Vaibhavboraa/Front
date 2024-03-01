// import React, { useState } from 'react';


// function CustomerLoan() {
//     const [loanAmount, setLoanAmount] = useState('');
//     const [loanType, setLoanType] = useState('');
//     const [interest, setInterest] = useState('');
//     const [tenure, setTenure] = useState('');
//     const [purpose, setPurpose] = useState('');
//     const [customerID, setCustomerID] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [availedLoans, setAvailedLoans] = useState([]);

//     const[message,setMessage]=useState('');
//     const[message1,setMessage1]=useState('');

//     const handleApplyForLoan = () => {
//         const requestBody = {
//             loanAmount: loanAmount,
//             loanType: loanType,
//             interest: interest,
//             tenure: tenure,
//             purpose: purpose,
//             customerID: customerID
//         };

//         fetch('http://localhost:5155/api/CustomerLoan/ApplyForLoan', {
//             method: 'POST',
//             headers: {
//                 'accept': '*/*',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestBody)
//         })
//             .then(response => {
//                 if (response.ok) {
//                     setSuccessMessage('Loan application submitted successfully.');
//                     return response.text();
//                 } else {
//                     throw new Error('Network response was not ok.');

//                 }
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//                 setMessage1('Error in generating loan application');
//             });
//     };

//     const handleGetAvailedLoans = () => {

//         if(customerID==='')
//         {
//             setMessage('Customer ID cannot be empty');
//             return;
//         }
//         fetch(`http://localhost:5155/api/CustomerLoan/AvailedLoans?customerId=${customerID}`, {
//             method: 'GET',
//             headers: {
//                 'accept': '*/*'
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Network response was not ok.');
//                 }
//             })
//             .then(data => {
//                 setAvailedLoans(data);
//                 setMessage('');
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//                 setMessage('Loan not found');
//             });
//     };

//     return (
//         <div className="container d-flex justify-content-center align-items-center flex-column ">
//             <div className="card w-50 mb-4 mt-4">
//                 <div className="card-body">
//                     <h2 className="card-title">Availed Loans</h2>
//                     <div className="mb-3">
//                         <label className="form-label">Customer ID:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={customerID}
//                             onChange={(e) => setCustomerID(e.target.value)}
//                         />
//                     </div>
//                     {/* <button className="btn buttons mb-3 card-title" onClick={handleGetAvailedLoans}>Get Availed Loans</button> */}
//                     <button
//                         className="btn buttons mb-3 card-title"
//                         onClick={handleGetAvailedLoans}
//                         style={{ fontSize: '16px', padding: '10px 15px' }}
//                     >
//                         Get Availed Loans
//                     </button>
//                     {message && <p>{message}</p>}

//                     {availedLoans.length > 0 && (
//                         <div>
//                             {availedLoans.map((loan, index) => (
//                                 <div key={index}>
//                                     <p>Loan ID: {loan.loanID}</p>
//                                     <p>Loan Amount: {loan.loanAmount}</p>
//                                     <p>Loan Type: {loan.loanType}</p>
//                                     <p>Interest: {loan.interest}</p>
//                                     <p>Tenure: {loan.tenure}</p>
//                                     <p>Purpose: {loan.purpose}</p>
//                                     <p>Status: {loan.status}</p>
//                                     <hr />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="card w-50 mt-4">
//                 <div className="card-body">
//                     <h2 className="card-title">Apply For Loan</h2>
//                     <div className="mb-3">
//                         <label className="form-label">Loan Amount:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={loanAmount}
//                             onChange={(e) => setLoanAmount(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Loan Type:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={loanType}
//                             onChange={(e) => setLoanType(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Interest:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={interest}
//                             onChange={(e) => setInterest(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Tenure:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={tenure}
//                             onChange={(e) => setTenure(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Purpose:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={purpose}
//                             onChange={(e) => setPurpose(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Customer ID:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={customerID}
//                             onChange={(e) => setCustomerID(e.target.value)}
//                         />
//                     </div>
//                     {/* <button className="btn buttons card-title" onClick={handleApplyForLoan}>Apply for Loan</button> */}
//                     <button
//                         className="btn buttons card-title"
//                         onClick={handleApplyForLoan}
//                         style={{ fontSize: '16px', padding: '10px 15px' }}
//                     >
//                         Apply for Loan
//                     </button>

//                     {successMessage && <p className="mt-3">{successMessage}</p>}
//                     {message1 && <p className="mt-3">{message1}</p>}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CustomerLoan;








//vat

// import React, { useState } from 'react';

// function CustomerLoan() {
//     const [loanAmount, setLoanAmount] = useState('');
//     const [loanType, setLoanType] = useState('');
//     const [interest, setInterest] = useState('');
//     const [tenure, setTenure] = useState('');
//     const [purpose, setPurpose] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [availedLoans, setAvailedLoans] = useState([]);
//     const [message, setMessage] = useState('');
//     const customerId = sessionStorage.getItem('customerId');
//     const token = sessionStorage.getItem('token');




//     const handleApplyForLoan = () => {
//         if (!loanAmount || !loanType || !interest || !tenure || !purpose) {
//             setMessage('Please fill in all required fields.');
//             return;
//         }

//         const requestBody = {
//             loanAmount: loanAmount,
//             loanType: loanType,
//             interest: interest,
//             tenure: tenure,
//             purpose: purpose,
//             customerID: customerId
//         };


//         fetch('http://localhost:5155/api/CustomerLoan/ApplyForLoan', {
//             method: 'POST',
//             headers: {
//                 'accept': '*/*',
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + token
//             },
//             body: JSON.stringify(requestBody)
//         })
//         .then(response => {
//             if (response.ok) {
//                 setSuccessMessage('Loan application submitted successfully.');
//                 return response.text();
//             } else {
//                 throw new Error('Network response was not ok.');
//             }
//         })
//         .catch(error => {
//             console.error('There was a problem with your fetch operation:', error);
//         });
//     };  

//     const handleGetAvailedLoans = () => {
//         fetch(`http://localhost:5155/api/CustomerLoan/AvailedLoans?customerId=${customerId}`, {
//             method: 'GET',
//             headers: {
//                 'accept': '*/*',
//                 'Authorization': 'Bearer ' + token
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Network response was not ok.');
//                 }
//             })
//             .then(data => {
//                 setAvailedLoans(data);
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//             });
//     };

//     return (
//         <div className="container d-flex justify-content-center align-items-center flex-column ">
//             <div className="card w-50 mb-4 mt-4">
//                 <div className="card-body">
//                     <h2 className="card-title">Availed Loans</h2>
//                     <button className="btn buttons mb-3 card-title"
//                         style={{ fontSize: '16px', padding: '10px 15px' }}
//                         onClick={handleGetAvailedLoans}>Get Availed Loans</button>
//                     {availedLoans.length > 0 && (
//                         <div>
//                             {availedLoans.map((loan, index) => (
//                                 <div key={index}>
//                                     <p>Loan ID: {loan.loanID}</p>
//                                     <p>Loan Amount: {loan.loanAmount}</p>
//                                     <p>Loan Type: {loan.loanType}</p>
//                                     <p>Interest: {loan.interest}</p>
//                                     <p>Tenure: {loan.tenure}</p>
//                                     <p>Purpose: {loan.purpose}</p>
//                                     <p>Status: {loan.status}</p>
//                                     <hr />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="card w-50 mt-4">
//                 <div className="card-body">
//                     <h2 className="card-title">Apply For Loan</h2>
//                     <div className="mb-3">
//                         <label className="form-label">Loan Amount:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={loanAmount}
//                             onChange={(e) => setLoanAmount(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Loan Type:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={loanType}
//                             onChange={(e) => setLoanType(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Interest:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={interest}
//                             onChange={(e) => setInterest(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Tenure:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={tenure}
//                             onChange={(e) => setTenure(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Purpose:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={purpose}
//                             onChange={(e) => setPurpose(e.target.value)}
//                         />
//                     </div>
//                     <button className="btn buttons card-title"  style={{fontSize: '16px', padding:'10px 15px'}}
//                      onClick={handleApplyForLoan}>Apply for Loan</button>

//                     {successMessage && <p className="mt-3">{successMessage}</p>}
//                     {message && <p>{message}</p>}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CustomerLoan;






/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from 'react';

// function CustomerLoan() {
//     const [loanAmount, setLoanAmount] = useState('');
//     const [loanType, setLoanType] = useState('');
//     const [interest, setInterest] = useState('');
//     const [tenure, setTenure] = useState('');
//     const [purpose, setPurpose] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [availedLoans, setAvailedLoans] = useState([]);
//     const [message, setMessage] = useState('');
//     const customerId = sessionStorage.getItem('customerId');
//     const token = sessionStorage.getItem('token');




//     const handleApplyForLoan = () => {

//         if (!loanAmount || !loanType || !interest || !tenure || !purpose) {
//             setMessage('Please fill in all required fields.');
//             return;
//         }
//         if (loanAmount <= 0) {
//             setMessage('Loan amount must be a positive value.');
//             return;
//         }

//         const isConfirmed = window.confirm('Are you sure you want to apply for this loan?');


//         if (isConfirmed) {
//             const requestBody = {
//                 loanAmount: loanAmount,
//                 loanType: loanType,
//                 interest: interest,
//                 tenure: tenure,
//                 purpose: purpose,
//                 customerID: customerId
//             };

//             fetch('http://localhost:5155/api/CustomerLoan/ApplyForLoan', {
//                 method: 'POST',
//                 headers: {
//                     'accept': '*/*',
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ' + token
//                 },
//                 body: JSON.stringify(requestBody)
//             })
//             .then(response => {
//                 if (response.ok) {
//                     setSuccessMessage('Loan application submitted successfully.');
//                     return response.text();
//                 } else {
//                     throw new Error('Network response was not ok.');
//                 }
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//             });
//         } else {

//             console.log('Loan application was cancelled.');
//         }
//     };


//     const handleGetAvailedLoans = () => {
//         fetch(`http://localhost:5155/api/CustomerLoan/AvailedLoans?customerId=${customerId}`, {
//             method: 'GET',
//             headers: {
//                 'accept': '*/*',
//                 'Authorization': 'Bearer ' + token
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Network response was not ok.');
//                 }
//             })
//             .then(data => {
//                 setAvailedLoans(data);
//             })
//             .catch(error => {
//                 console.error('There was a problem with your fetch operation:', error);
//             });
//     };

//     return (
//         <div className="container d-flex justify-content-center align-items-center flex-column ">
//             <div className="card w-50 mb-4 mt-4">
//                 <div className="card-body">
//                     <h2 className="card-title">Availed Loans</h2>
//                     <button className="btn buttons mb-3 card-title"
//                         style={{ fontSize: '16px', padding: '10px 15px' }}
//                         onClick={handleGetAvailedLoans}>Get Availed Loans</button>
//                     {availedLoans.length > 0 && (
//                         <div>
//                             {availedLoans.map((loan, index) => (
//                                 <div key={index}>
//                                     <p>Loan ID: {loan.loanID}</p>
//                                     <p>Loan Amount: {loan.loanAmount}</p>
//                                     <p>Loan Type: {loan.loanType}</p>
//                                     <p>Interest: {loan.interest}</p>
//                                     <p>Tenure: {loan.tenure}</p>
//                                     <p>Purpose: {loan.purpose}</p>
//                                     <p>Status: {loan.status}</p>
//                                     <hr />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="card w-50 mt-4">
//                 <div className="card-body">
//                     <h2 className="card-title">Apply For Loan</h2>
//                     <div className="mb-3">
//                         <label className="form-label">Loan Amount:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={loanAmount}
//                             onChange={(e) => setLoanAmount(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Loan Type:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={loanType}
//                             onChange={(e) => setLoanType(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Interest:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={interest}
//                             onChange={(e) => setInterest(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Tenure:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={tenure}
//                             onChange={(e) => setTenure(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Purpose:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={purpose}
//                             onChange={(e) => setPurpose(e.target.value)}
//                         />
//                     </div>
//                     <button className="btn buttons card-title"  style={{fontSize: '16px', padding:'10px 15px'}}
//                      onClick={handleApplyForLoan}>Apply for Loan</button>

//                     {successMessage && <p className="mt-3">{successMessage}</p>}
//                     {message && <p>{message}</p>}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CustomerLoan;



import React, { useState } from 'react';

function CustomerLoan() {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanType, setLoanType] = useState('');
    const [interest, setInterest] = useState('');
    const [tenure, setTenure] = useState('');
    const [purpose, setPurpose] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [availedLoans, setAvailedLoans] = useState([]);
    const [message, setMessage] = useState('');
    const customerId = sessionStorage.getItem('customerId');
    const token = sessionStorage.getItem('token');




    const handleApplyForLoan = () => {

        if (!loanAmount || !loanType || !interest || !tenure || !purpose) {
            setMessage('Please fill in all required fields.');
            return;
        }
        if (loanAmount <= 0) {
            setMessage('Loan amount must be a positive value.');
            return;
        }

        const isConfirmed = window.confirm('Are you sure you want to apply for this loan?');


        if (isConfirmed) {
            const requestBody = {
                loanAmount: loanAmount,
                loanType: loanType,
                interest: interest,
                tenure: tenure,
                purpose: purpose,
                customerID: customerId
            };

            fetch('http://localhost:5155/api/CustomerLoan/ApplyForLoan', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(requestBody)
            })
                .then(response => {
                    if (response.ok) {
                        setSuccessMessage('Loan application submitted successfully.');
                        return response.text();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });
        } else {

            console.log('Loan application was cancelled.');
        }
    };


    const handleGetAvailedLoans = () => {
        fetch(`http://localhost:5155/api/CustomerLoan/AvailedLoans?customerId=${customerId}`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                setAvailedLoans(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column ">
            <div className="card w-50 mb-4 mt-4">
                <div className="card-body">
                    <h2 className="card-title">Availed Loans</h2>
                    <button className="btn buttons mb-3 card-title"
                        style={{ fontSize: '16px', padding: '10px 15px' }}
                        onClick={handleGetAvailedLoans}>Get Availed Loans</button>
                    {availedLoans.length > 0 && (
                        <div>
                            {availedLoans.map((loan, index) => (
                                <div key={index}>
                                    <p>Loan ID: {loan.loanID}</p>
                                    <p>Loan Amount: {loan.loanAmount}</p>
                                    <p>Loan Type: {loan.loanType}</p>
                                    <p>Interest: {loan.interest}</p>
                                    <p>Tenure: {loan.tenure}</p>
                                    <p>Purpose: {loan.purpose}</p>
                                    <p>Status: {loan.status}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="card w-50 mt-4">
                <div className="card-body">
                    <h2 className="card-title">Apply For Loan</h2>
                    <div className="mb-3">
                        <label className="form-label">Loan Amount:</label>
                        <select


                            className="form-control"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="10000">10000</option>
                            <option value="50000">50000</option>
                            <option value="100000">100000</option>
                            <option value="500000">50000</option>

                        </select>

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Loan Type:</label>
                        <select
                            className="form-control"
                            value={loanType}
                            onChange={(e) => setLoanType(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Personal">Personal</option>
                            <option value="Home">Home</option>
                            <option value="Educational">Educational</option>

                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Interest:</label>
                        <select
                            className="form-control"
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="5">5%</option>
                            <option value="10">10%</option>
                            <option value="12">12%</option>
                            <option value="15">15%</option>


                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tenure:</label>
                        <select
                            className="form-control"
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="12">12 months</option>
                            <option value="24">24 months</option>
                            <option value="2">2 year</option>
                            <option value="5">5 year</option>

                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Purpose:</label>
                        <select
                            className="form-control"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Home Improvement">Home Improvement</option>
                            <option value="Education">Education</option>
                            <option value="Marrige">Marrige</option>

                        </select>
                    </div>
                    <button className="btn buttons card-title" style={{ fontSize: '16px', padding: '10px 15px' }}
                        onClick={handleApplyForLoan}>Apply for Loan</button>

                    {successMessage && <p className="mt-3">{successMessage}</p>}
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default CustomerLoan;

