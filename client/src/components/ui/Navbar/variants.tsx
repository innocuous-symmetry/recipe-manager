import API from "../../../util/API";
import { Button, Dropdown } from '..'
import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
    const { user, setUser, setToken } = useAuthContext();
    const navigate = useNavigate();
    const auth = new API.Auth();

    const [dropdownActive, setDropdownActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    const handleLogout = async () => {
        await auth.logout();

        // nullify cookie and unset user/token data
        document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setUser(undefined);
        setToken(undefined);
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
                    <p>Hi, {user && user.firstname}.</p>
                    <span id="search-icon"></span>
                    <Button onClick={() => handleUIChange("SEARCH")}>Search</Button>
                    <Button onClick={() => handleUIChange("ACTIONS")}>Actions</Button>
                </div>
            </div>
            {
                dropdownActive && (
                    <Dropdown extraClasses="top-menu-bar actions-bar">
                        <Button onClick={() => handleOptionSelect('/add-recipe')}>Add a Recipe</Button>
                        <Button onClick={() => handleOptionSelect("/add-friends")}>Add Friends</Button>
                        <Button onClick={() => handleOptionSelect('/collections')}>My Collections</Button>
                        <Button onClick={() => handleOptionSelect('/subscriptions')}>Subscriptions</Button>
                        <Button onClick={() => handleOptionSelect('/profile')}>Profile</Button>
                        <Button onClick={handleLogout}>Log Out</Button>
                    </Dropdown>
                )
            }
            {
                searchActive && (
                    <Dropdown extraClasses="top-menu-bar search-bar">
                        <Button>Run Search</Button>
                    </Dropdown>
                )
            }
        </div>
    )
}

const NotLoggedIn = () => {
    const navigate = useNavigate();

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

const Registering = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    return (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {user?.firstname}.</p>
            </div>
        </div>
    )
}

export { LoggedIn, NotLoggedIn, Registering }