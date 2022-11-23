import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IUser } from "../../schemas";
import { attemptLogout } from "../../util/apiUtils";
import Button from "./Button";
import "/src/sass/components/Navbar.scss";

const Navbar = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const navbarLoggedIn = (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {user?.firstname}</p>
                <span id="search-icon"></span>
                <Button onClick={() => console.log(user)}>Auth Context?</Button>
                <Button onClick={() => navigate('/profile')}>Profile</Button>
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
                <p>Hi, {user?.firstname}</p>
            </div>
        </div>
    )

    return user ? navbarLoggedIn : navbarNotLoggedIn;
}

export default Navbar;