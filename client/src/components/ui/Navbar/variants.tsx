import { attemptLogout } from "../../../util/apiUtils";
import { NavbarType } from "../../../util/types";
import { Button, Dropdown } from '../.'
import { useState } from "react";

const LoggedIn: NavbarType = ({ received, liftChange, navigate }) => {
    const [dropdownActive, setDropdownActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    const handleLogout = async () => {
        const success = await attemptLogout();
        if (success) liftChange!(undefined);
        navigate('/');
    }

    const handleUIChange = (target: string) => {
        if (target == "SEARCH") {
            setSearchActive(!searchActive);
            setDropdownActive(false);
        } else {
            setSearchActive(false);
            setDropdownActive(!dropdownActive);
        }
    }

    const handleOptionSelect = (payload: string) => {
        setSearchActive(false);
        setDropdownActive(false);
        navigate(payload);
    }

    return (
        <div>
            <div id="navbar">
                <div className="navbar-block">
                    <a onClick={() => navigate('/')}>RECIPIN</a>
                </div>
                <div className="navbar-block">
                    <p>Hi, {received?.firstname}.</p>
                    <span id="search-icon"></span>
                    <Button onClick={() => handleUIChange("SEARCH")}>Search</Button>
                    <Button onClick={() => handleUIChange("ACTIONS")}>Actions</Button>
                </div>
            </div>
            {
                dropdownActive && (
                    <Dropdown extraStyles="top-menu-bar actions-bar">
                        <Button onClick={() => handleOptionSelect('/add-recipe')}>Add a Recipe</Button>
                        <Button onClick={() => handleOptionSelect('/collections')}>My Collections</Button>
                        <Button onClick={() => handleOptionSelect('/subscriptions')}>Subscriptions</Button>
                        <Button onClick={() => handleOptionSelect('/profile')}>Profile</Button>
                        <Button onClick={handleLogout}>Log Out</Button>
                    </Dropdown>
                )
            }
            {
                searchActive && (
                    <Dropdown extraStyles="top-menu-bar search-bar">
                        <Button>Run Search</Button>
                    </Dropdown>
                )
            }
        </div>
    )
}

const NotLoggedIn: NavbarType = ({ navigate }) => {
    return (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className='navbar-block'>
                <button onClick={() => navigate('/login')}>LOG IN</button>
            </div>
        </div>
    )
}

const Registering: NavbarType = ({ received, navigate }) => {
    return (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {received?.firstname}.</p>
            </div>
        </div>
    )
}

export { LoggedIn, NotLoggedIn, Registering }