// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../AuthContext'; 

// const CustomerNav = () => {
//   const { signOut } = useAuth(); 



//   return (
//     <nav id="navbarNav" className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#400440' }}>
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/customer">
//           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGbrZCdHlfhEVvjShAvvV3z7TEuU21PGPPNg&usqp=CAU" alt="Maverick Bank Logo" width="50" height="50" className="d-inline-block rounded-circle" />
//           <strong><b>MAVERICK BANK</b></strong>
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
//           <ul className="navbar-nav">
//             <li className="nav-item m-2">
//               <Link className="nav-link" to="/customer/account">Account</Link>
//             </li>
//             <li className="nav-item m-2">
//               <Link className="nav-link" to="/customer/loan">Loan</Link>
//             </li>
//             <li className="nav-item m-2">
//               <Link className="nav-link" to="/customer/transactions">Transaction</Link>
//             </li>
//             <li className="nav-item m-2">
//               <button className="nav-link btn btn-link" onClick={signOut}>Sign Out</button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default CustomerNav;


import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const CustomerNav = () => {
  const { signOut } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      signOut();
    }
  };


  return (
    <nav id="navbarNav" className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#400440' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/customer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGbrZCdHlfhEVvjShAvvV3z7TEuU21PGPPNg&usqp=CAU" alt="Maverick Bank Logo" width="50" height="50" className="d-inline-block rounded-circle" />
          <strong><b>MAVERICK BANK</b></strong>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item m-2">
              <Link className="nav-link" to="/customer/account">Account</Link>
            </li>
            <li className="nav-item m-2">
              <Link className="nav-link" to="/customer/loan">Loan</Link>
            </li>
            <li className="nav-item m-2">
              <Link className="nav-link" to="/customer/transactions">Transaction</Link>
            </li>
            <li className="nav-item m-2">
              <button className="nav-link btn btn-link" style={{
                color: '#ffc107',
                background: 'transparent',
                border: 'none',
                transition: 'color 0.3s',
              }}
                onMouseOver={(e) => e.target.style.color = '#fff'}
                onMouseOut={(e) => e.target.style.color = '#ffc107'} onClick={handleLogout}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNav;

