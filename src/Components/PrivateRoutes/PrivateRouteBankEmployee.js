import { Navigate, Outlet } from "react-router-dom"

function PrivateRouteBankEmployee() {
    var isLoggedIn = sessionStorage.getItem('token')
    var userType = sessionStorage.getItem('userType');
    var isBankEmployee = isLoggedIn && userType === 'BankEmployee'
    return (
        isBankEmployee ? <Outlet /> : <Navigate to='/login/bankemployeelogin' />
    );
}

export default PrivateRouteBankEmployee;

