import { useState } from "react";
import './CustomerRegistration.css';

function CustomerRegistration() {


   
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [name, setName] = useState("");
    var [dob, setDob] = useState("");
    var [age, setAge] = useState("");
    var [phoneNumber, setPhoneNumber] = useState("");
    var [address, setAddress] = useState("");
    var [aadharNumber, setAadharNumber] = useState("");
    var [panNumber, setPanNumber] = useState("");
    var [gender, setGender] = useState("");

    var[missingFeilds,setMissingFieldsMessage]=useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState('');

    var customer = {};
    var register = () => {
        customer.email = email;
        customer.password = password;
        customer.name = name;

        customer.dob = dob;
        customer.age = age;
        customer.phoneNumber = phoneNumber;
        customer.address = address;
        customer.aadharNumber = aadharNumber;
        customer.panNumber = panNumber;
        customer.gender = gender;
        console.log(customer);

        

       
        
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        }
        console.log(requestOptions);
        fetch("http://localhost:5155/api/Customer/Register", requestOptions)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setRegistrationSuccess('Registration Successful');
            console.log("Registration successful!");
        })
        .catch(err => {
            console.log(err);
            setRegistrationSuccess('error registering');
        });


    };
    var changename = (eventargs) => {
        setEmail(eventargs.target.value)
    }
    return (
        <div>
           

            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Registration</h5>
                                <div className="alert divregister">
                                    <label className="form-control">Email</label>
                                    <input className="form-control" type="text" value={email}
                                        onChange={changename} />
                                    <label className="form-control">Password</label>
                                    <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label className="form-control">Name</label>
                                    <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    <label className="form-control">DOB</label>
                                    <input className="form-control" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                                    <label className="form-control">Age</label>
                                    <input className="form-control" type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                                    <label className="form-control">Phone</label>
                                    <input className="form-control" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    <label className="form-control">Address</label>
                                    <input className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    <label className="form-control">AadhaarNumber</label>
                                    <input className="form-control" type="text" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} />
                                    <label className="form-control">Pan Number</label>
                                    <input className="form-control" type="text" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
                                    <label className="form-control">Gender</label>
                                    <input className="form-control" type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                                    <div className="buttons">
                                        <button onClick={register} className="btn success">Register</button>
                                        <button className="btn cancel">Cancel</button>
                                        {registrationSuccess && <p>{registrationSuccess} </p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    );
}
export default CustomerRegistration;








// import { useState } from "react";
// import './CustomerRegistration.css';

// function CustomerRegistration() {
//     var [email, setEmail] = useState("");
//     var [password, setPassword] = useState("");
//     var [name, setName] = useState("");
//     var [dob, setDob] = useState("");
//     var [age, setAge] = useState("");
//     var [phoneNumber, setPhoneNumber] = useState("");
//     var [address, setAddress] = useState("");
//     var [aadharNumber, setAadharNumber] = useState("");
//     var [panNumber, setPanNumber] = useState("");
//     var [gender, setGender] = useState("");

//     var customer = {};
//     var register = () => {
//         customer.email = email;
//         customer.password = password;
//         customer.name = name;

//         customer.dob = dob;
//         customer.age = age;
//         customer.phoneNumber = phoneNumber;
//         customer.address = address;
//         customer.aadharNumber = aadharNumber;
//         customer.panNumber = panNumber;
//         customer.gender = gender;
//         console.log(customer);
//         var requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(customer)
//         }
//         console.log(requestOptions);
//         fetch("http://localhost:5155/api/Customer/Register", requestOptions)
//             .then(res => res.json())
//             .then(res => console.log(res))
//             .catch(err => console.log(err));


//     };
//     var changename = (eventargs) => {
//         setEmail(eventargs.target.value)
//     }
//     return (
//         <div>
           

//             <div className="container">
//                 <div className="row justify-content-center mt-5">
//                     <div className="col-md-6">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">Registration</h5>
//                                 <div className="alert divregister">
//                                     <label className="form-control">Email</label>
//                                     <input className="form-control" type="text" value={email}
//                                         onChange={changename} />
//                                     <label className="form-control">Password</label>
//                                     <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                                     <label className="form-control">Name</label>
//                                     <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
//                                     <label className="form-control">DOB</label>
//                                     <input className="form-control" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
//                                     <label className="form-control">Age</label>
//                                     <input className="form-control" type="text" value={age} onChange={(e) => setAge(e.target.value)} />
//                                     <label className="form-control">Phone</label>
//                                     <input className="form-control" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//                                     <label className="form-control">Address</label>
//                                     <input className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//                                     <label className="form-control">AadhaarNumber</label>
//                                     <input className="form-control" type="text" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} />
//                                     <label className="form-control">Pan Number</label>
//                                     <input className="form-control" type="text" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
//                                     <label className="form-control">Gender</label>
//                                     <input className="form-control" type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
//                                     <div className="buttons">
//                                         <button onClick={register} className="btn success">Register</button>
//                                         <button className="btn cancel">Cancel</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>



//         </div>

//     );
// }
// export default CustomerRegistration;