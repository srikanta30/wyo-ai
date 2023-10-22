import Register from "./register";
import Login from "./login";

const Auth = (prob)=>{
    return (
        <>
            {
                prob.switchForm==='login'?  <Login /> : <Register />
            } 
        </>
    )
}

export default Auth;