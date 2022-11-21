import { useState } from "react";
import "/src/sass/components/Navbar.scss";

const Navbar = () => {
    // state will be evaluated here to determine which navbar
    // variant will be displayed

    // this will come from state (session?)
    const [user, setUser] = useState('Mikayla');

    const navbarLoggedIn = (
        <div id="navbar">
            <div className="navbar-block">
                <a href="/">RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {user}</p>
                <span id="search-icon"></span>
                <button onClick={() => console.log('menu button')}>...</button>
            </div>
        </div>
    )

    const navbarNotLoggedIn = (
        <div id="navbar">
            <div className="navbar-block">
                <a href="/">RECIPIN</a>
            </div>
            <div className='navbar-block'>
                <button>LOG IN</button>
            </div>
        </div>
    )

    const navbarRegistering = (
        <div id="navbar">
            <div className="navbar-block">
                <a href="/">RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {user}</p>
            </div>
        </div>
    )

    return navbarLoggedIn;
}

export default Navbar;