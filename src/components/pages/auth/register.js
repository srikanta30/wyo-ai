import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from '../../../config/config';

const Register = ()=>{

    const [fullName, setFullName] = useState('');
    const [emailId, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function registe_user(e){
        e.preventDefault();
        const {full_name, email_id, password} = e.target.elements;
        
        axios.post(API_BASE_URL + "users/register-user", {
            full_name: full_name.value,
            email_id: email_id.value,
            password: password.value
        })
        .then((res) => {
            if(res.data===true){
                alert('Success!');
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <div className="registration-form text-left">
            <form onSubmit={registe_user}>
                <div className="form-group">
                    <label className="labelTitle">Full Name</label>
                    <input type="text" placeholder="Full name" name="full_name" className="form-control customInput" onInput={(e)=>setFullName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="labelTitle">Email ID</label>
                    <input type="email" placeholder="Your Email" name="email_id" className="form-control customInput" onInput={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="labelTitle">Create Password</label>
                    <input type="password" placeholder="Create Password" name="password" className="form-control customInput" onInput={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className="btn main-btn mt-4" style={{width: '100%', height: '39px'}} type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default Register;