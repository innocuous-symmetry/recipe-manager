import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { attemptLogout } from "../../../util/apiUtils";
import { IUser } from "../../../schemas";
import Button from "../Button";
import "/src/sass/components/Navbar.scss";

const Navbar = () => {
    // setup and local state
    const navigate = useNavigate();
    const authContext = useAuthContext();
    const [received, setReceived] = useState<IUser>();
    const [displayed, setDisplayed] = useState<JSX.Element>();

    // helper to unwrap async result
    const handleLogout = async () => {
        const success = await attemptLogout();
        if (success) setReceived(undefined);
    }

    // jsx variations
    const navbarLoggedIn = (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {received?.firstname}.</p>
                <span id="search-icon"></span>
                <Button onClick={() => navigate('/profile')}>Profile</Button>
                <Button onClick={handleLogout}>Log Out</Button>
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
                <p>Hi, {received?.firstname}.</p>
            </div>
        </div>
    )

    // side effects for live rendering
    useEffect(() => {
        console.log(authContext);
        authContext && setReceived(authContext.user);
    }, [authContext])

    useEffect(() => {
        console.log(received);
        setDisplayed(received ? navbarLoggedIn : navbarNotLoggedIn);
    }, [received, setReceived]);

    return displayed || <p>Loading...</p>;
}

export default Navbar;