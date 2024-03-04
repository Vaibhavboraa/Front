import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordAdmin() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   // const [message, setMessage] = useState('');
    const [message1, setMessage1] = useState('');
    const navigate=useNavigate();
    

    const handlePasswordChange = () => {

        if (email ==='') {
            setMessage1("Please fill email");
            return;
        }
        if (newPassword ==='') {
            setMessage1("Please fill new Password");
            return;
        }
        if (confirmPassword ==='') {
            setMessage1("Please fill confirm Password");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage1("new password and confirm password do not match");
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            setMessage1("Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        fetch(`http://localhost:5155/api/Customer/ResetPassword?email=${email}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
         
        
        },
            
            body: JSON.stringify({})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Password change failed: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            setMessage1(data);
            setNewPassword('');
            setConfirmPassword('');
            navigate('/login/adminlogin');
            window.alert('Password changed successfully!');
        })
        .catch(error => {
            setMessage1(`Error resetting password: ${error.message}`);
            console.error('Error resetting password:', error);
        });
    }

    return (
        <div className="container ">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center">Forgot Password</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                        <button type="button " className="btn btn success" onClick={handlePasswordChange}>Reset Password</button>
                        {/* {message && <p className="mt-3">{message}</p>} */}
                        {message1 && <p className="mt-3">{message1}</p>}
                    </form>
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default ForgotPasswordAdmin;