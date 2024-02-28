import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import CustomerLogin from './Components/CustomerLogin/CustomerLogin';
import BankEmployeeLogin from './Components/BankEmployeeLogin/BankEmployeeLogin';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminCustomerManagement from './Components/AdminCustomerManagement/AdminCustomerManagement';
import AdminBankEmployeeManagement from './Components/AdminBankEmployeeManagement/AdminBankEmployeeManagement';
import AdminNavigation from './Components/Navigation/AdminNavigation'; // Import AdminNavigation component
import Customer from './Components/Customer/Customer';
import CustomerAccount from './Components/CustomerAccount/CustomerAccount';
import CustomerLoan from './Components/CustomerLoan/CustomerLoan';
import CustomerTransactions from './Components/CustomerTransactions/CustomerTransactions';
import DetailedTransactions from './Components/Transactions/DetailedTransactions';
import CustomerRegistration from './Components/CustomerRegistraion/CustomerRegistration';
import LandingPageNav from './Components/Navigation/LandingPageNav';
import CustomerNav from './Components/Navigation/CustomerNav';
import CustomerLoginNav from './Components/Navigation/CustomerLoginNav';
import BankEmployeeAccount from './Components/BankEmployeeAccount/BankEmployeeAccount';
import BankEmployeeNavigation from './Components/Navigation/BankEmployeeNavigation';
import BankEmployeeLoan from './Components/BankEmployeeLoan/BankEmployeeLoan';
import BankEmployeeTransaction from './Components/BankEmployeeTransaction/BankEmployeeTransaction';
import BankEmployeeLoginNav from './Components/Navigation/BankEmployeeLoginNav';
import AdminLoginNavigation from './Components/Navigation/AdminLoginNavigation';
import CustomerRegistraionNav from './Components/Navigation/CustomerRegistraionNav';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';
import PrivateRouteBankEmployee from './Components/PrivateRoutes/PrivateRouteBankEmployee';
import PrivateRouteAdmin from './Components/PrivateRoutes/PrivateRouteAdmin';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<><LandingPageNav /><LandingPage /></>} />
          <Route path="/login" element={<> <CustomerLoginNav /> <CustomerLogin /> </>} />
          <Route path="/register" element={<><CustomerRegistraionNav /><CustomerRegistration /></>} />
          <Route path="/login/bankemployeelogin" element={<><BankEmployeeLoginNav /><BankEmployeeLogin /></>} />
          <Route path="/login/adminlogin" element={<><AdminLoginNavigation /><AdminLogin /></>} />


          <Route path="/admincustomermanagement" element={<><PrivateRouteAdmin/> <AdminNavigation />
            <AdminCustomerManagement /> </>} /> {/* Add this route for AdminCustomerManagement */}
          <Route path="/adminbankemployeemanagement" element={<><PrivateRouteAdmin/> <AdminNavigation />
            <AdminBankEmployeeManagement /> </>} /> {/* Add this route for AdminBankEmployeeManagement */}


          <Route path="/bankemployee/account/*" element={<>
            <BankEmployeeNavigation />
            <Routes>
              <Route path="/" element={<><PrivateRouteBankEmployee/><BankEmployeeAccount /></>} />
              <Route path="loan" element={<><PrivateRouteBankEmployee/><BankEmployeeLoan /></>} />
              <Route path="transactions" element={<><PrivateRouteBankEmployee/><BankEmployeeTransaction /></>} />
            </Routes>
          </>} />

          <Route path="/customer/*" element={<>
            <CustomerNav />
            <Routes>
              <Route path="/account" element={<><PrivateRoute /><CustomerAccount /></>} />
              <Route path="/loan" element={<><PrivateRoute/><CustomerLoan /></>} />
              <Route path="/transactions" element={<><PrivateRoute/><CustomerTransactions /></>} />
              <Route path="/detailed-transactions" element={<><PrivateRoute/><DetailedTransactions /></>} />
            </Routes>
          </>} />
          <Route path="/customer" element={<><PrivateRoute/>
            <CustomerNav />
            <Customer />
          </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


