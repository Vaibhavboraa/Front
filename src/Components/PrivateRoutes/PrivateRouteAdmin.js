import { Navigate, Outlet } from "react-router-dom"

function PrivateRouteAdmin(){
    var isLoggedIn = sessionStorage.getItem('token')
    var userType=sessionStorage.getItem('userType');
     var isAdmin=isLoggedIn && userType==='Admin'
    return(
        isAdmin?<Outlet/>:<Navigate to='/login/adminlogin'/>
    );
}

export default PrivateRouteAdmin;
