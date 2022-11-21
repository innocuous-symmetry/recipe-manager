import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { attemptLogout } from "../../util/apiUtils";
import Button from "./Button";
import "/src/sass/components/Navbar.scss";

const Navbar = () => {
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const [user, setUser] = useState('Mikayla');

    const navbarLoggedIn = (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {authContext.user?.firstname}</p>
                <span id="search-icon"></span>
                <Button onClick={attemptLogout}>Log Out</Button>
            </div>
        </div>
    )

    const navbarNotLoggedIn = (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className='navbar-block'>
                <button onClick={() => navigate('/login')}>LOG IN</button>
            </div>
        </div>
    )

    const navbarRegistering = (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {authContext.user?.firstname}</p>
            </div>
        </div>
    )

    if (authContext.user) {
        return navbarLoggedIn;
    } else {
        return navbarNotLoggedIn;
    }
}

export default Navbar;