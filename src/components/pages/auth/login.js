import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from '../../../config/config';
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const navigate = useNavigate();
    const [emailId, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);


    function login_user(e){
        e.preventDefault();
        const {email_id, password} = e.target.elements;
        
        axios.post(API_BASE_URL + "users/login-user", {
            email_id: email_id.value,
            password: password.value
        })
        .then((res) => {
            if(res.data.status===true){
                localStorage.setItem('authToken', JSON.stringify(res.data.token))
                localStorage.setItem('authStatus', true)
                //window.location.href = '/product';
               // navigate('/product')
               window.location.reload();
            }else{
                setLoginStatus(false);
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <div className="registration-form text-left">
            <form onSubmit={login_user}>
                <div className="form-group">
                    <label className="labelTitle">Email ID</label>
                    <input type="email" placeholder="Your Email" name="email_id" className="form-control customInput" onInput={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="labelTitle">Create Password</label>
                    <input type="password" placeholder="Create Password" name="password" className="form-control customInput" onInput={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    {loginStatus===false &&
                    
                        <div className="alert alert-danger mt-3">Invalid user ID / Password.</div>
                    }
                    <button className="btn main-btn mt-4" style={{width: '100%', height: '39px'}} type="submit">Login</button>
                </div>
            </form>

            
        </div>
    )
}

export default Login;