import { Link } from "react-router-dom";


function Header(){
    return (
        <>
        
        <div className="leftGradient"></div>
        <div className="rightGradient"></div>
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                
                <a href="/"><img src="logo.png" alt="Logo" /></a>
                </div>
                <ul className="menu-list">
                <li className="menu-item">How it works?</li>
                <li className="menu-item">About Us</li>
                <li className="menu-item">Contact Us</li>
                </ul>
            </div>
            </nav> 
         
        </>
    )
}

export default Header;

    